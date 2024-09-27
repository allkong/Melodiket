package com.ssafy.jdbc.melodiket.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerResp;
import com.ssafy.jdbc.melodiket.user.entity.Role;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class StageManagerCursorRepository extends BaseQueryRepository<StageManagerEntity, StageManagerResp> {
    @Autowired
    public StageManagerCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, StageManagerEntity.class, ErrorDetail.USER_NOT_FOUND);
    }

    public PageResponse<StageManagerResp> findAll(CursorPagingReq pagingReq) {
        return findWithPagination(pagingReq, StageManagerResp::from, entityPath.get("role").eq(Role.STAGE_MANAGER.name()));
    }
}
