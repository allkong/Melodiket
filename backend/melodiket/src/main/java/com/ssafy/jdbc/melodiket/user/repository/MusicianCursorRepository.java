package com.ssafy.jdbc.melodiket.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MusicianCursorRepository extends BaseQueryRepository<MusicianEntity, MusicianResp> {
    @Autowired
    public MusicianCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, MusicianEntity.class, ErrorDetail.USER_NOT_FOUND);
    }

    public PageResponse<MusicianResp> findAll(CursorPagingReq pagingReq) {
        return findWithPagination(pagingReq, MusicianResp::from, entityPath.get("role").eq(Role.MUSICIAN));
    }
}
