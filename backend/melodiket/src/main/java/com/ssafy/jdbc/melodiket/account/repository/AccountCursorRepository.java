package com.ssafy.jdbc.melodiket.account.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.account.controller.dto.AccountResp;
import com.ssafy.jdbc.melodiket.account.entity.AccountEntity;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.QAppUserEntity;
import org.springframework.stereotype.Repository;

@Repository
public class AccountCursorRepository extends BaseQueryRepository<AccountEntity, AccountResp> {
    protected AccountCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, AccountEntity.class, ErrorDetail.ACCOUNT_NOT_FOUND);
    }

    public PageResponse<AccountResp> findByUser(CursorPagingReq pagingReq, AppUserEntity user) {
        BooleanExpression condition = entityPath.get("appUserEntity", QAppUserEntity.class).get("id").eq(user.getId());
        return findWithPagination(pagingReq, AccountResp::from, condition);
    }
}
