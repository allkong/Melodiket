package com.ssafy.jdbc.melodiket.concert.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.common.service.redis.DistributedLock;
import com.ssafy.jdbc.melodiket.concert.controller.dto.*;
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
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.ticket.repository.TicketRepository;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianInfo;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import com.ssafy.jdbc.melodiket.wallet.service.WalletService;
import com.ssafy.jdbc.melodiket.webpush.controller.dto.TransactionResultResp;
import com.ssafy.jdbc.melodiket.webpush.service.WebPushService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
    private final TicketRepository ticketRepository;
    private final WebPushService webPushService;

    // 커서 기반 공연 목록 조회 메서드
    public PageResponse<ConcertResp> getConcerts(ConcertCursorPagingReq pagingReq) {
        // 동적 필터링을 위한 BooleanExpression 리스트
        List<BooleanExpression> conditions = new ArrayList<>();

        // 상태 필터 적용
        if (pagingReq.getStatus() != null && pagingReq.getStatus().length > 0) {
            List<ConcertStatus> statuses = Stream.of(pagingReq.getStatus())
                    .map(ConcertStatus::valueOf)
                    .toList();
            conditions.add(QConcertEntity.concertEntity.concertStatus.in(statuses));
        }

        // 제목 필터 적용
        if (pagingReq.getTitle() != null && !pagingReq.getTitle().isEmpty()) {
            conditions.add(QConcertEntity.concertEntity.title.containsIgnoreCase(pagingReq.getTitle()));
        }
        // 동적 필터 조건 결합
        BooleanExpression condition = combineConditions(conditions);

        // 조건을 기반으로 페이징 조회 수행
        return concertCursorRepository.findWithPagination(pagingReq, ConcertResp::from, condition);
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-cancelConcert')")
    public void cancelConcert(String loginId, AppUserEntity user, UUID concertId, String operationId) {
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
        }

        TransactionResultResp.TransactionResultRespBuilder respBuilder = TransactionResultResp.builder()
                .operation("cancelConcert")
                .operationId(operationId);
        WalletResp managerWallet = walletService.getWalletOf(owner.getUuid());
        Credentials managerCredentials = Credentials.create(managerWallet.privateKey());
        ManagerContract managerContract = new ManagerContract(blockchainConfig, managerCredentials);
        try {
            managerContract.cancelConcert(concert.getUuid());

            concert.cancel();
            concertRepository.save(concert);

            List<TicketEntity> tickets = concert.getTickets();
            for (TicketEntity ticket : tickets) {
                ticket.refund();
                ticketRepository.delete(ticket);
            }

            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .targetUuid(concert.getUuid().toString())
                    .build();
            webPushService.initiatePushNotification(user, "공연 취소 완료", "공연 취소 완료", resp);
        } catch (Exception e) {
            log.error("Failed to cancel concert", e);
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.FAIL)
                    .targetUuid(concertId.toString())
                    .build();
            webPushService.initiatePushNotification(user, "공연 취소 실패", "공연 취소 실패", resp);
            throw new RuntimeException(e);
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
    public void createConcert(String loginId, AppUserEntity user, CreateConcertReq createConcertReq, String operationId) {
        StageManagerEntity owner = stageManagerRepository.findByUuid(user.getUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        ConcertEntity concert = getConcertEntityFromReq(owner, createConcertReq);
        List<MusicianEntity> musicians = musicianRepository.findAllByUuidIn(createConcertReq.getMusicians());
        List<String> musicianWalletAddresses = assignAndGetMusicianWalletAddresses(concert, musicians);

        WalletResp ownerWallet = walletService.getWalletOf(owner.getUuid());
        Credentials ownerCredentials = Credentials.create(ownerWallet.privateKey());
        ManagerContract managerContract = new ManagerContract(blockchainConfig, ownerCredentials);

        TransactionResultResp.TransactionResultRespBuilder respBuilder = TransactionResultResp.builder()
                .operation("createConcert")
                .operationId(operationId);
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

            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .targetUuid(concert.getUuid().toString())
                    .build();
            webPushService.initiatePushNotification(user, "공연 생성 완료", "공연 생성 완료", resp);
        } catch (Exception e) {
            log.error("Failed to create concert", e);
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.FAIL)
                    .targetUuid(null)
                    .build();
            webPushService.initiatePushNotification(user, "공연 생성 실패", "공연 생성 실패", resp);
            throw new RuntimeException(e);
        }
    }

    @DistributedLock(key = "#loginId.concat('-approveConcert')")
    @Async
    @Transactional(rollbackFor = Exception.class)
    public void approveConcert(UUID concertId, String loginId, ConcertApproveReq concertApproveReq, String operationId) {
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

        TransactionResultResp.TransactionResultRespBuilder respBuilder = TransactionResultResp.builder()
                .operation("approveConcert")
                .operationId(operationId);
        WalletResp musicianWallet = walletService.getWalletOf(musician.getUuid());
        Credentials musicianCredentials = Credentials.create(musicianWallet.privateKey());
        MusicianContract musicianContract = new MusicianContract(blockchainConfig, musicianCredentials);
        try {
            boolean isSucceed = musicianContract.agreeToConcert(concert.getUuid());
            participant.approve(concertApproveReq.getSignatureImageUrl());

            concertParticipantMusicianRepository.save(participant);

            // 만약 모든 요청이 수락되면
            boolean isAllApproved = concertParticipantMusicianRepository.findAllByConcertEntity(concert).stream()
                    .allMatch(p -> p.getApprovalStatus() == ApprovalStatus.APPROVED);
            // 콘서트를 활성 상태로 변경
            if (isAllApproved) {
                concert.active();
                concertRepository.save(concert);
            }

            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .targetUuid(concert.getUuid().toString())
                    .build();
            webPushService.initiatePushNotification(musician, "공연 참여 승인 완료", "공연 참여 승인 완료", resp);
        } catch (Exception e) {
            log.error("Failed to approve concert", e);
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.FAIL)
                    .targetUuid(concertId.toString())
                    .build();
            webPushService.initiatePushNotification(musician, "공연 참여 승인 실패", "공연 참여 승인 실패", resp);
            throw new RuntimeException(e);
        }

    }

    @DistributedLock(key = "#loginId.concat('-denyConcert')")
    @Async
    @Transactional(rollbackFor = Exception.class)
    public void denyConcert(UUID concertId, String loginId, String operationId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        MusicianEntity musician = musicianRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.MUSICIAN_NOT_FOUND));

        ConcertParticipantMusicianEntity participant = concertParticipantMusicianRepository
                .findByConcertEntityAndMusicianEntity(concert, musician)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.PARTICIPANT_NOT_FOUND));

        TransactionResultResp.TransactionResultRespBuilder respBuilder = TransactionResultResp.builder()
                .operation("denyConcert")
                .operationId(operationId);
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

            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .targetUuid(concert.getUuid().toString())
                    .build();
            webPushService.initiatePushNotification(musician, "공연 참여 거절 완료", "공연 참여 거절 완료", resp);
        } catch (Exception e) {
            log.error("Failed to deny concert", e);
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.FAIL)
                    .targetUuid(concertId.toString())
                    .build();
            webPushService.initiatePushNotification(musician, "공연 참여 거절 실패", "공연 참여 거절 실패", resp);
            throw new RuntimeException(e);
        }
    }

    public PageResponse<ConcertResp> getConcertsByStageManager(UUID stageManagerUuid, ConcertCursorPagingReq cursorPagingReq) {
        StageManagerEntity stageManager = stageManagerRepository.findByUuid(stageManagerUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        List<UUID> stageUuids = stageManager.getStageEntities().stream()
                .map(e -> e.getUuid())
                .toList();

        BooleanExpression condition = QConcertEntity.concertEntity.stageEntity.uuid.in(stageUuids);
        if (cursorPagingReq.getStatus() != null && cursorPagingReq.getStatus().length > 0) {
            List<ConcertStatus> statuses = Stream.of(cursorPagingReq.getStatus())
                    .map(ConcertStatus::valueOf)
                    .toList();
            condition = condition.and(QConcertEntity.concertEntity.concertStatus.in(statuses));
        }
        return concertCursorRepository.findWithPagination(cursorPagingReq, ConcertResp::from, condition);
    }

    public PageResponse<ConcertResp> getConcertsByStage(UUID stageUuid, ConcertCursorPagingReq pagingReq) {
        StageEntity stage = stageRepository.findByUuid(stageUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        BooleanExpression condition = QConcertEntity.concertEntity.stageEntity.uuid.eq(stageUuid);
        if (pagingReq.getStatus() != null && pagingReq.getStatus().length > 0) {
            List<ConcertStatus> statuses = Stream.of(pagingReq.getStatus())
                    .map(ConcertStatus::valueOf)
                    .toList();
            condition = condition.and(QConcertEntity.concertEntity.concertStatus.in(statuses));
        }

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

    public void checkIsConcertClosable(AppUserEntity user, UUID id) {
        StageManagerEntity owner = stageManagerRepository.findByUuid(user.getUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        ConcertEntity concert = concertRepository.findByUuid(id)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        if (!concert.getOwner().getUuid().equals(owner.getUuid())) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER);
        }

        if (concert.getConcertStatus() != ConcertStatus.ACTIVE) {
            throw new HttpResponseException(ErrorDetail.CONFLICT);
        }
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-closeConcert')")
    @Transactional(rollbackFor = Exception.class)
    public void closeConcert(String loginId, AppUserEntity user, UUID id, String operationId) {
        StageManagerEntity owner = stageManagerRepository.findByUuid(user.getUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        ConcertEntity concert = concertRepository.findByUuid(id)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        TransactionResultResp.TransactionResultRespBuilder respBuilder = TransactionResultResp.builder()
                .operation("closeConcert")
                .operationId(operationId);
        WalletResp ownerWallet = walletService.getWalletOf(owner.getUuid());
        Credentials ownerCredentials = Credentials.create(ownerWallet.privateKey());
        ManagerContract managerContract = new ManagerContract(blockchainConfig, ownerCredentials);

        try {
            managerContract.closeConcert(concert.getUuid());
            concert.close();
            concertRepository.save(concert);

            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .targetUuid(concert.getUuid().toString())
                    .build();
            webPushService.initiatePushNotification(user, "공연 종료 완료", "공연 종료 완료", resp);
        } catch (Exception e) {
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.FAIL)
                    .targetUuid(concert.getUuid().toString())
                    .build();
            webPushService.initiatePushNotification(user, "공연 종료 실패", "공연 종료 실패", resp);
            throw new RuntimeException(e);
        }
    }

    private BooleanExpression combineConditions(List<BooleanExpression> conditions) {
        BooleanExpression result = null;
        for (BooleanExpression condition : conditions) {
            if (result == null) {
                result = condition;
            } else {
                result = result.and(condition);
            }
        }
        return result;
    }

    public List<ConcertResp> getCreatedConcertsByStageManager(UUID stageManagerUuid) {
        StageManagerEntity stageManager = stageManagerRepository.findByUuid(stageManagerUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        List<ConcertEntity> createdConcerts = concertRepository.findAllByOwner(stageManager);

        return createdConcerts.stream()
                .map(ConcertResp::from)
                .collect(Collectors.toList());
    }
}

