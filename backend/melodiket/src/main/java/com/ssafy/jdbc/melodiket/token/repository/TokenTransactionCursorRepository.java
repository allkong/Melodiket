package com.ssafy.jdbc.melodiket.token.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.account.service.AccountService;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.token.entity.QTokenTransactionLogEntity;
import com.ssafy.jdbc.melodiket.token.entity.TokenTransactionLogEntity;
import com.ssafy.jdbc.melodiket.token.service.dto.TokenTransactionLogResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TokenTransactionCursorRepository extends BaseQueryRepository<TokenTransactionLogEntity, TokenTransactionLogResp> {
    private final QTokenTransactionLogEntity qTokenTransactionLogEntity = QTokenTransactionLogEntity.tokenTransactionLogEntity;

    @Autowired
    public TokenTransactionCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, TokenTransactionLogEntity.class, ErrorDetail.TRANSACTION_LOG_NOT_FOUND);
    }

    public PageResponse<TokenTransactionLogResp> getAsFrom(String from, AccountService.LogType logType, CursorPagingReq pagingReq) {
        BooleanExpression condition = qTokenTransactionLogEntity.fromIdentifier.eq(from);
        if (logType != null) {
            condition = condition.and(qTokenTransactionLogEntity.logType.eq(logType));
        }
        return findWithPagination(pagingReq, TokenTransactionLogResp::from, condition);
    }

    public PageResponse<TokenTransactionLogResp> getAsTo(String to, AccountService.LogType logType, CursorPagingReq pagingReq) {
        BooleanExpression condition = qTokenTransactionLogEntity.toIdentifier.eq(to);
        if (logType != null) {
            condition = condition.and(qTokenTransactionLogEntity.logType.eq(logType));
        }
        return findWithPagination(pagingReq, TokenTransactionLogResp::from, condition);
    }

    public PageResponse<TokenTransactionLogResp> getAsFromOrTo(String fromOrTo, AccountService.LogType logType, CursorPagingReq pagingReq) {
        BooleanExpression condition = qTokenTransactionLogEntity.fromIdentifier.eq(fromOrTo)
                .or(qTokenTransactionLogEntity.toIdentifier.eq(fromOrTo));
        if (logType != null) {
            condition = condition.and(qTokenTransactionLogEntity.logType.eq(logType));
        }
        return findWithPagination(pagingReq, TokenTransactionLogResp::from, condition);
    }
}
