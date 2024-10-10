package com.ssafy.jdbc.melodiket.concert.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.concert.controller.dto.ConcertAssignmentResp;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.concert.entity.QConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import org.springframework.stereotype.Repository;

@Repository
public class ConcertParticipantMusicianCursorRepository extends BaseQueryRepository<ConcertParticipantMusicianEntity, ConcertAssignmentResp> {
    private final QConcertParticipantMusicianEntity qConcertParticipantMusicianEntity = QConcertParticipantMusicianEntity.concertParticipantMusicianEntity;

    public ConcertParticipantMusicianCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, ConcertParticipantMusicianEntity.class, ErrorDetail.CONCERT_PARTICIPANT_MUSICIAN_NOT_FOUND);
    }

    public PageResponse<ConcertAssignmentResp> getConcertAssignmentsOf(MusicianEntity musician, CursorPagingReq pagingReq) {
        BooleanExpression condition = qConcertParticipantMusicianEntity.musicianEntity.eq(musician);
        return findWithPagination(pagingReq, ConcertAssignmentResp::from, condition);
    }
}
