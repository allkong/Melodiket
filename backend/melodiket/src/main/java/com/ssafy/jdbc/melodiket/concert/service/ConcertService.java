package com.ssafy.jdbc.melodiket.concert.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.common.service.redis.DistributedLock;
import com.ssafy.jdbc.melodiket.concert.controller.dto.ConcertResp;
import com.ssafy.jdbc.melodiket.concert.controller.dto.CreateConcertReq;
import com.ssafy.jdbc.melodiket.concert.controller.dto.CreateStandingConcertReq;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertStatus;
import com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertCursorRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertParticipantMusicianRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.stage.repository.StageRepository;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import com.ssafy.jdbc.melodiket.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConcertService {

    private final ConcertCursorRepository concertCursorRepository;
    private final ConcertRepository concertRepository;
    private final StageRepository stageRepository;
    private final MusicianRepository musicianRepository;
    private final ConcertParticipantMusicianRepository concertParticipantMusicianRepository;
    private final StageManagerRepository stageManagerRepository;
    private final WalletService walletService;
    private final BlockchainConfig blockchainConfig;

    // 커서 기반 공연 목록 조회 메서드
    public PageResponse<ConcertResp> getConcerts(CursorPagingReq pagingReq) {
        PageResponse<ConcertResp> concerts = concertCursorRepository.findWithPagination(pagingReq, ConcertResp::from);

        return concerts;
    }

    public void cancelConcert(UUID concertId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        if (concert.getConcertStatus() == ConcertStatus.CANCELED) {
            throw new HttpResponseException(ErrorDetail.ALREADY_CANCELED);
        } else {
            concert.cancel();
            concertRepository.save(concert);
        }
    }

    public ConcertResp getConcertDetail(UUID concertId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

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
                concert.getConcertParticipantMusicians().stream()
                        .map(participant -> participant.getMusicianEntity().getUuid())
                        .toList(),
                concert.getConcertStatus()
        );
    }

    private ConcertEntity.ConcertEntityBuilder getCommonConcertEntityBuilder(CreateConcertReq req, List<MusicianEntity> musicians) {
        StageEntity stage = stageRepository.findByUuid(req.getStageUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        return ConcertEntity.builder()
                .uuid(UUID.randomUUID())
                .title(req.getTitle())
                .stageEntity(stage)
                .startAt(req.getStartAt())
                .ticketingAt(req.getTicketingAt())
                .description(req.getDescription())
                .posterCid(req.getPosterCid())
                .ticketPrice(req.getTicketPrice())
                .ownerStake(req.getOwnerStake())
                .musicianStake(req.getMusicianStake())
                .favoriteMusicianStake(req.getFavoriteMusicianStake());
    }

    private List<String> assignAndGetMusicianWalletAddresses(ConcertEntity concert, List<MusicianEntity> musicians) {
        List<String> musicianWalletAddresses = new ArrayList<>();
        for (MusicianEntity musician : musicians) {
            ConcertParticipantMusicianEntity participant = ConcertParticipantMusicianEntity.builder()
                    .concertEntity(concert)
                    .musicianEntity(musician)
                    .approval(false) // 초기 승인 상태를 false로 설정
                    .build();
            WalletResp wallet = walletService.getWalletOf(musician.getUuid());
            musicianWalletAddresses.add(wallet.address());
            concert.getConcertParticipantMusicians().add(participant);
        }
        return musicianWalletAddresses;
    }

    @DistributedLock(key = "#user.uuid.concat('-createConcert')")
    @Async
    public void createStandingConcert(AppUserEntity user, CreateStandingConcertReq createConcertReq) {
        StageManagerEntity owner = stageManagerRepository.findByUuid(user.getUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        List<MusicianEntity> musicians = musicianRepository.findAllByUuidIn(createConcertReq.getMusicians());
        ConcertEntity.ConcertEntityBuilder builder = getCommonConcertEntityBuilder(createConcertReq, musicians);
        builder.owner(owner);
        builder.availableTickets(createConcertReq.getAvailableTickets());
        ConcertEntity concert = builder.build();

        assignAndGetMusicianWalletAddresses(concert, musicians);

        // TODO : 블록체인 연동
//        WalletResp ownerWallet = walletService.getWalletOf(owner.getUuid());
//        Credentials ownerCredentials = Credentials.create(ownerWallet.privateKey());
//        ManagerContract managerContract = new ManagerContract(blockchainConfig, ownerCredentials);

        concertRepository.save(concert);
    }

    public void approveConcert(UUID concertId, String loginId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        MusicianEntity musician = musicianRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.MUSICIAN_NOT_FOUND));

        ConcertParticipantMusicianEntity participant = concertParticipantMusicianRepository
                .findByConcertEntityAndMusicianEntity(concert, musician)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.PARTICIPANT_NOT_FOUND));

        participant.approve();
        concertParticipantMusicianRepository.save(participant);
    }

    @Transactional
    public void denyConcert(UUID concertId, String loginId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        MusicianEntity musician = musicianRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.MUSICIAN_NOT_FOUND));

        ConcertParticipantMusicianEntity participant = concertParticipantMusicianRepository
                .findByConcertEntityAndMusicianEntity(concert, musician)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.PARTICIPANT_NOT_FOUND));

        participant.deny();
        concertParticipantMusicianRepository.save(participant);
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
}
