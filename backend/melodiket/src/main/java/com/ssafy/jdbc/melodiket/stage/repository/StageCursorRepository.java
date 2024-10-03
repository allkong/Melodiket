package com.ssafy.jdbc.melodiket.stage.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.stage.dto.StageInfoResponse;
import com.ssafy.jdbc.melodiket.stage.entity.QStageEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.user.entity.QStageManagerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class StageCursorRepository extends BaseQueryRepository<StageEntity, StageInfoResponse> {
    private final QStageEntity qStageEntity = QStageEntity.stageEntity;
    private final QStageManagerEntity qStageManagerEntity = QStageManagerEntity.stageManagerEntity;

    @Autowired
    public StageCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, StageEntity.class, ErrorDetail.STAGE_NOT_FOUND);
    }
}
