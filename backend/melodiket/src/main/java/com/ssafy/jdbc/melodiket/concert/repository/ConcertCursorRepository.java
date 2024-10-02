package com.ssafy.jdbc.melodiket.concert.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.concert.controller.dto.ConcertResp;
import com.ssafy.jdbc.melodiket.concert.controller.dto.FooConcertResp;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ConcertCursorRepository extends BaseQueryRepository<ConcertEntity, ConcertResp> {

    @Autowired
    public ConcertCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, ConcertEntity.class, ErrorDetail.STAGE_NOT_FOUND);
    }
}
