package com.ssafy.jdbc.melodiket.concert.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.common.service.redis.DistributedLock;
import com.ssafy.jdbc.melodiket.concert.controller.dto.ConcertAssignmentResp;
import com.ssafy.jdbc.melodiket.concert.controller.dto.ConcertResp;
import com.ssafy.jdbc.melodiket.concert.controller.dto.CreateConcertReq;
import com.ssafy.jdbc.melodiket.concert.entity.*;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertCursorRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertParticipantMusicianCursorRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertParticipantMusicianRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.concert.service.contract.ManagerContract;
import com.ssafy.jdbc.melodiket.concert.service.contract.MusicianContract;
import com.ssafy.jdbc.melodiket.concert.service.dto.SeatingConcertCreateReq;
import com.ssafy.jdbc.melodiket.concert.service.dto.StandingConcertCreateReq;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.stage.repository.StageRepository;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianInfo;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import com.ssafy.jdbc.melodiket.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConcertService {

    private final ConcertCursorRepository concertCursorRepository;
    private final ConcertRepository concertRepository;
    private final StageRepository stageRepository;
    private final MusicianRepository musicianRepository;
    private final ConcertParticipantMusicianRepository concertParticipantMusicianRepository;
    private final StageManagerRepository stageManagerRepository;
    private final ConcertParticipantMusicianCursorRepository concertParticipantMusicianCursorRepository;
    private final WalletService walletService;
    private final BlockchainConfig blockchainConfig;
    private final JPAQueryFactory jpaQueryFactory;

    // 커서 기반 공연 목록 조회 메서드
    public PageResponse<ConcertResp> getConcerts(CursorPagingReq pagingReq) {
        PageResponse<ConcertResp> concerts = concertCursorRepository.findWithPagination(pagingReq, ConcertResp::from);
        return concerts;
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-cancelConcert')")
    public void cancelConcert(String loginId, AppUserEntity user, UUID concertId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));
        StageManagerEntity owner = stageManagerRepository.findByUuid(user.getUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        // 소유자 확인
        if (!concert.getOwner().getUuid().equals(owner.getUuid())) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER);
        }

        if (concert.getConcertStatus() == ConcertStatus.CANCELED) {
            throw new HttpResponseException(ErrorDetail.ALREADY_CANCELED);
        } else {
            WalletResp managerWallet = walletService.getWalletOf(owner.getUuid());
            Credentials managerCredentials = Credentials.create(managerWallet.privateKey());
            ManagerContract managerContract = new ManagerContract(blockchainConfig, managerCredentials);
            try {
                managerContract.cancelConcert(concert.getUuid());

                // TODO : 구매된 티켓이 있으면 모두 환불 처리
                concert.cancel();
                concertRepository.save(concert);
            } catch (Exception e) {
                log.error("Failed to cancel concert", e);
                throw new RuntimeException(e);
            }

        }
    }

    public ConcertResp getConcertDetail(UUID concertId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        List<MusicianInfo> musicians = concert.getConcertParticipantMusicians().stream()
                .map(participant -> new MusicianInfo(
                        participant.getMusicianEntity().getUuid(),
                        participant.getMusicianEntity().getName(),
                        participant.getMusicianEntity().getImageUrl()))
                .toList();

        return new ConcertResp(
                concert.getUuid(),
                concert.getStageEntity().getUuid(),
                concert.getTitle(),
                concert.getCreatedAt(),
                concert.getStartAt(),
                concert.getTicketingAt(),
                concert.getAvailableTickets(),
                concert.getDescription(),
                concert.getPosterCid(),
                concert.getTicketPrice(),
                concert.getOwnerStake(),
                concert.getMusicianStake(),
                concert.getFavoriteMusicianStake(),
                concert.getStageEntity().getName(),
                musicians,
                concert.getStageEntity().getCapacity(),
                concert.getStageEntity().getIsStanding(),
                concert.getConcertStatus()
        );
    }

    private ConcertEntity getConcertEntityFromReq(StageManagerEntity stageManager, CreateConcertReq req) {
        StageEntity stage = stageRepository.findByUuid(req.getStageUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        if (!stage.getOwner().getUuid().equals(stageManager.getUuid())) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER);
        }

        long availableTickets = stage.getIsStanding() ? stage.getCapacity() : stage.getNumOfRow() * stage.getNumOfCol();

        return ConcertEntity.builder()
                .uuid(UUID.randomUUID())
                .owner(stageManager)
                .title(req.getTitle())
                .stageEntity(stage)
                .startAt(req.getStartAt())
                .ticketingAt(req.getTicketingAt())
                .description(req.getDescription())
                .posterCid(req.getPosterCid())
                .availableTickets(availableTickets)
                .ticketPrice(req.getTicketPrice())
                .ownerStake(req.getOwnerStake())
                .musicianStake(req.getMusicianStake())
                .favoriteMusicianStake(req.getFavoriteMusicianStake())
                .concertStatus(ConcertStatus.PREPARING)
                .build();
    }

    private List<String> assignAndGetMusicianWalletAddresses(ConcertEntity concert, List<MusicianEntity> musicians) {
        List<String> musicianWalletAddresses = new ArrayList<>();
        for (MusicianEntity musician : musicians) {
            ConcertParticipantMusicianEntity participant = ConcertParticipantMusicianEntity.builder()
                    .uuid(UUID.randomUUID())
                    .concertEntity(concert)
                    .musicianEntity(musician)
                    .approvalStatus(ApprovalStatus.PENDING)
                    .build();
            WalletResp wallet = walletService.getWalletOf(musician.getUuid());
            musicianWalletAddresses.add(wallet.address());
            concert.getConcertParticipantMusicians().add(participant);
        }
        return musicianWalletAddresses;
    }

    @DistributedLock(key = "#loginId.concat('-createConcert')")
    @Async
    public void createConcert(String loginId, AppUserEntity user, CreateConcertReq createConcertReq) {
        StageManagerEntity owner = stageManagerRepository.findByUuid(user.getUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        ConcertEntity concert = getConcertEntityFromReq(owner, createConcertReq);
        List<MusicianEntity> musicians = musicianRepository.findAllByUuidIn(createConcertReq.getMusicians());
        List<String> musicianWalletAddresses = assignAndGetMusicianWalletAddresses(concert, musicians);

        WalletResp ownerWallet = walletService.getWalletOf(owner.getUuid());
        Credentials ownerCredentials = Credentials.create(ownerWallet.privateKey());
        ManagerContract managerContract = new ManagerContract(blockchainConfig, ownerCredentials);
        try {
            if (concert.getStageEntity().getIsStanding()) {
                StandingConcertCreateReq req = new StandingConcertCreateReq(concert, musicianWalletAddresses);
                log.info("Created standing concert : {}", managerContract.createStandingConcert(req));
            } else {
                StageEntity stage = concert.getStageEntity();
                SeatingConcertCreateReq req = new SeatingConcertCreateReq(concert, musicianWalletAddresses, stage);
                log.info("Created seating concert : {}", managerContract.createSeatingConcert(req));
            }
            concertRepository.save(concert);
        } catch (Exception e) {
            log.error("Failed to create concert", e);
            throw new RuntimeException(e);
        }
    }

    @DistributedLock(key = "#loginId.concat('-approveConcert')")
    @Async
    @Transactional(rollbackFor = Exception.class)
    public void approveConcert(UUID concertId, String loginId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        // 취소된 콘서트에는 불가능
        if (concert.getConcertStatus() == ConcertStatus.CANCELED) {
            throw new HttpResponseException(ErrorDetail.CONFLICT);
        }

        MusicianEntity musician = musicianRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.MUSICIAN_NOT_FOUND));

        ConcertParticipantMusicianEntity participant = concertParticipantMusicianRepository
                .findByConcertEntityAndMusicianEntity(concert, musician)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.PARTICIPANT_NOT_FOUND));

        WalletResp musicianWallet = walletService.getWalletOf(musician.getUuid());
        Credentials musicianCredentials = Credentials.create(musicianWallet.privateKey());
        MusicianContract musicianContract = new MusicianContract(blockchainConfig, musicianCredentials);
        try {
            boolean isSucceed = musicianContract.agreeToConcert(concert.getUuid());
            participant.approve();
            concertParticipantMusicianRepository.save(participant);

            // 만약 모든 요청이 수락되면
            boolean isAllApproved = concertParticipantMusicianRepository.findAllByConcertEntity(concert).stream()
                    .allMatch(p -> p.getApprovalStatus() == ApprovalStatus.APPROVED);
            // 콘서트를 활성 상태로 변경
            if (isAllApproved) {
                concert.active();
                concertRepository.save(concert);
            }

        } catch (Exception e) {
            log.error("Failed to approve concert", e);
            throw new RuntimeException(e);
        }

    }

    @DistributedLock(key = "#loginId.concat('-denyConcert')")
    @Async
    @Transactional(rollbackFor = Exception.class)
    public void denyConcert(UUID concertId, String loginId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        MusicianEntity musician = musicianRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.MUSICIAN_NOT_FOUND));

        ConcertParticipantMusicianEntity participant = concertParticipantMusicianRepository
                .findByConcertEntityAndMusicianEntity(concert, musician)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.PARTICIPANT_NOT_FOUND));

        WalletResp musicianWallet = walletService.getWalletOf(musician.getUuid());
        Credentials musicianCredentials = Credentials.create(musicianWallet.privateKey());
        MusicianContract musicianContract = new MusicianContract(blockchainConfig, musicianCredentials);

        try {
            boolean isSucceed = musicianContract.denyToConcert(concert.getUuid());
            participant.deny();
            concertParticipantMusicianRepository.save(participant);

            // 한 사람이라도 거절했으면 공연 취소
            concert.cancel();
            concertRepository.save(concert);
        } catch (Exception e) {
            log.error("Failed to deny concert", e);
            throw new RuntimeException(e);
        }
    }

    public PageResponse<ConcertResp> getConcertsByStageManager(UUID stageManagerUuid, CursorPagingReq cursorPagingReq) {

        StageManagerEntity stageManager = stageManagerRepository.findByUuid(stageManagerUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        List<UUID> stageUuids = stageManager.getStageEntities().stream()
                .map(e -> e.getUuid())
                .toList();

        BooleanExpression condition = QConcertEntity.concertEntity.stageEntity.uuid.in(stageUuids);
        return concertCursorRepository.findWithPagination(cursorPagingReq, ConcertResp::from, condition);
    }

    public PageResponse<ConcertResp> getConcertsByStage(UUID stageUuid, CursorPagingReq pagingReq) {
        StageEntity stage = stageRepository.findByUuid(stageUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        BooleanExpression condition = QConcertEntity.concertEntity.stageEntity.uuid.eq(stageUuid);

        return concertCursorRepository.findWithPagination(
                pagingReq,
                ConcertResp::from,
                condition
        );
    }

    public PageResponse<ConcertAssignmentResp> getAssignedConcerts(AppUserEntity user, CursorPagingReq cursorPagingReq) {
        MusicianEntity musician = musicianRepository.findByLoginId(user.getLoginId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.MUSICIAN_NOT_FOUND));
        return concertParticipantMusicianCursorRepository.getConcertAssignmentsOf(musician, cursorPagingReq);
    }
}
