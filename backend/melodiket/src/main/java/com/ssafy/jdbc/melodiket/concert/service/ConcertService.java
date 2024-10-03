package com.ssafy.jdbc.melodiket.concert.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.concert.controller.dto.ConcertResp;
import com.ssafy.jdbc.melodiket.concert.controller.dto.CreateConcertReq;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertCursorRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertParticipantMusicianRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.stage.repository.StageRepository;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // 커서 기반 공연 목록 조회 메서드
    public PageResponse<ConcertResp> getConcerts(CursorPagingReq pagingReq) {
        PageResponse<ConcertResp> concerts = concertCursorRepository.findWithPagination(pagingReq, ConcertResp::from);

        return concerts;
    }

    public void cancelConcert(UUID concertId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        if (concert.isDeleted()) {
            throw new HttpResponseException(ErrorDetail.ALREADY_CANCELED);
        } else {
            concert.delete();
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
                concert.isDeleted()
        );
    }

    public ConcertResp createConcert(CreateConcertReq createConcertReq) {
        StageEntity stage = stageRepository.findByUuid(createConcertReq.stageUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        ConcertEntity concert = ConcertEntity.builder()
                .uuid(UUID.randomUUID())
                .title(createConcertReq.title())
                .stageEntity(stage)
                .startAt(createConcertReq.startAt())
                .ticketingAt(createConcertReq.ticketingAt())
                .availableTickets(createConcertReq.availableTickets())
                .description(createConcertReq.description())
                .posterCid(createConcertReq.posterCid())
                .ticketPrice(createConcertReq.ticketPrice())
                .ownerStake(createConcertReq.ownerStake())
                .musicianStake(createConcertReq.musicianStake())
                .favoriteMusicianStake(createConcertReq.favoriteMusicianStake())
                .build();

        List<MusicianEntity> musicians = musicianRepository.findAllByUuidIn(createConcertReq.musicians());
        for (MusicianEntity musician : musicians) {
            ConcertParticipantMusicianEntity participant = ConcertParticipantMusicianEntity.builder()
                    .concertEntity(concert)
                    .musicianEntity(musician)
                    .approval(false) // 초기 승인 상태를 false로 설정
                    .build();
            concert.getConcertParticipantMusicians().add(participant);
        }

        concertRepository.save(concert);

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
                concert.isDeleted()
        );
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

        List<UUID> stageUuids = stageManager.getStageAssignmentEntities().stream()
                .map(assignment -> assignment.getStageEntity().getUuid())
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
