package com.ssafy.jdbc.melodiket.concert.service;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageInfoCursor;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.concert.controller.dto.ConcertResp;
import com.ssafy.jdbc.melodiket.concert.controller.dto.FooConcertResp;
import com.ssafy.jdbc.melodiket.concert.controller.dto.CreateConcertReq;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertCursorRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertParticipantMusicianRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.stage.entity.StageAssignmentEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.stage.repository.StageRepository;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity.concertEntity;

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
//        int pageSize = pagingReq.getPageSize();
//        boolean hasNext = concerts.size() > pageSize;
//
//        List<ConcertEntity> resultConcerts = hasNext ? concerts.subList(0, pageSize) : concerts;
//
//        UUID nextCursor = hasNext ? resultConcerts.get(resultConcerts.size() - 1).getUuid() : null;
//
//        List<ConcertResp> concertResps = resultConcerts.stream()
//                .map(concert -> new ConcertResp(
//                        concert.getUuid(),
//                        concert.getStageEntity().getUuid(),
//                        concert.getTitle(),
//                        concert.getCreatedAt(),
//                        concert.getStartAt(),
//                        concert.getTicketingAt(),
//                        concert.getAvailableTickets(),
//                        concert.getDescription(),
//                        concert.getPosterCid(),
//                        concert.getTicketPrice(),
//                        concert.getOwnerStake(),
//                        concert.getMusicianStake(),
//                        concert.getFavoriteMusicianStake(),
//                        concert.getStageEntity().getName(),
//                        concert.getConcertParticipantMusicians().stream()
//                                .map(participant -> participant.getMusicianEntity().getUuid())
//                                .toList(),
//                        concert.isDeleted()
//                )).toList();
//        return new FooConcertResp(
//                new PageInfoCursor(
//                        hasNext, pageSize, concertResps.size(), nextCursor
//                ),
//                concertResps
//        );
    }

    public void cancelConcert(UUID concertId, String loginId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        StageEntity stage = concert.getStageEntity();

        if(concert.isDeleted()){
            throw new HttpResponseException(ErrorDetail.ALREADY_CANCELED);
        }else {
            concert.delete();
            concertRepository.save(concert);
            System.out.println("콘서트의 취소상태는??" + concert.isDeleted());
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

    @Transactional
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

        List<MusicianEntity> musicians = musicianRepository.findAllByUuidIn(createConcertReq.musicianUuids());
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

    @Transactional
    public void approveConcert(UUID concertId, UUID musicianId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        MusicianEntity musician = musicianRepository.findByUuid(musicianId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.MUSICIAN_NOT_FOUND));

        ConcertParticipantMusicianEntity participant = concertParticipantMusicianRepository
                .findByConcertEntityAndMusicianEntity(concert, musician)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.PARTICIPANT_NOT_FOUND));

        // 상태 변경 메서드 호출
        participant.approve();
        concertParticipantMusicianRepository.save(participant);
    }

    @Transactional
    public void denyConcert(UUID concertId, UUID musicianId) {
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        MusicianEntity musician = musicianRepository.findByUuid(musicianId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.MUSICIAN_NOT_FOUND));

        ConcertParticipantMusicianEntity participant = concertParticipantMusicianRepository
                .findByConcertEntityAndMusicianEntity(concert, musician)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.PARTICIPANT_NOT_FOUND));
        participant.deny();
        concertParticipantMusicianRepository.save(participant);
    }

    @Transactional(readOnly = true)
    public ConcertResp getConcertsByStageManager(UUID stageManagerUuid, CursorPagingReq cursorPagingReq) {

        StageManagerEntity stageManager = stageManagerRepository.findByUuid(stageManagerUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        List<StageEntity> stages = stageManager.getStageAssignmentEntities().stream()
                .map(StageAssignmentEntity::getStageEntity)
                .toList();

        // ConcertCursorRepository를 사용하여 커서 기반 페이징 결과 조회
//        List<ConcertEntity> concerts = concertCursorRepository.findWithPagination(
//                sort, lastUuid, isFirstPage, pageSize + 1);
//
//        boolean hasNext = concerts.size() > pageSize;
//
//        // 결과 리스트를 페이지 사이즈에 맞게 조정
//        List<ConcertEntity> resultConcerts = hasNext ? concerts.subList(0, pageSize) : concerts;
//
//        // 다음 커서 값 설정
//        UUID nextCursor = hasNext ? resultConcerts.get(resultConcerts.size() - 1).getUuid() : null;
//
//        List<ConcertResp> concertResps = resultConcerts.stream()
//                .map(concert -> new ConcertResp(
//                        concert.getUuid(),
//                        concert.getStageEntity().getUuid(),
//                        concert.getTitle(),
//                        concert.getCreatedAt(),
//                        concert.getStartAt(),
//                        concert.getTicketingAt(),
//                        concert.getAvailableTickets(),
//                        concert.getDescription(),
//                        concert.getPosterCid(),
//                        concert.getTicketPrice(),
//                        concert.getOwnerStake(),
//                        concert.getMusicianStake(),
//                        concert.getFavoriteMusicianStake(),
//                        concert.getStageEntity().getName(),
//                        concert.getConcertParticipantMusicians().stream()
//                                .map(participant -> participant.getMusicianEntity().getUuid())
//                                .toList(),
//                        concert.isDeleted()
//                )).toList();
//
//        return new FooConcertResp(
//                new PageInfoCursor(
//                        hasNext,
//                        pageSize,
//                        concertResps.size(),
//                        nextCursor
//                ),
//                concertResps
//        );
        return null;
        //debug
    }

    @Transactional(readOnly = true)
    public FooConcertResp getConcertsByStage(UUID stageUuid, boolean isFirstPage, UUID lastUuid, int pageSize, String orderKey, String orderDirection) {

//        StageEntity stage = stageRepository.findByUuid(stageUuid)
//                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));
//
//        // 정렬 기준 설정
//        Sort sort = Sort.by(Sort.Order.by(orderKey).with(Sort.Direction.fromString(orderDirection)));
//
//        //해당 Stage의 Concert 목록을 조회
//        List<ConcertEntity> concerts = concertCursorRepository.findWithPagination(
//                sort, lastUuid, isFirstPage, pageSize + 1,
//                concertEntity.stageEntity.eq(stage)
//        );
//
//        boolean hasNext = concerts.size() > pageSize;
//
//        List<ConcertEntity> resultConcerts = hasNext ? concerts.subList(0, pageSize) : concerts;
//        UUID nextCursor = hasNext ? resultConcerts.get(resultConcerts.size() - 1).getUuid() : null;
//
//        List<ConcertResp> concertResps = resultConcerts.stream()
//                .map(concert -> new ConcertResp(
//                        concert.getUuid(),
//                        concert.getStageEntity().getUuid(),
//                        concert.getTitle(),
//                        concert.getCreatedAt(),
//                        concert.getStartAt(),
//                        concert.getTicketingAt(),
//                        concert.getAvailableTickets(),
//                        concert.getDescription(),
//                        concert.getPosterCid(),
//                        concert.getTicketPrice(),
//                        concert.getOwnerStake(),
//                        concert.getMusicianStake(),
//                        concert.getFavoriteMusicianStake(),
//                        concert.getStageEntity().getName(),
//                        concert.getConcertParticipantMusicians().stream()
//                                .map(participant -> participant.getMusicianEntity().getUuid())
//                                .toList(),
//                        concert.isDeleted()
//                )).toList();
//
//        return new FooConcertResp(
//                new PageInfoCursor(
//                        hasNext,
//                        pageSize,
//                        concertResps.size(),
//                        nextCursor
//                ),
//                concertResps
//        );
        return null; //debug
    }
}
