package com.ssafy.jdbc.melodiket.stage.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.stage.dto.StageInfoResponse;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class StageCursorRepository extends BaseQueryRepository<StageEntity, StageInfoResponse> {
    @Autowired
    public StageCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, StageEntity.class, ErrorDetail.STAGE_NOT_FOUND);
    }
}
