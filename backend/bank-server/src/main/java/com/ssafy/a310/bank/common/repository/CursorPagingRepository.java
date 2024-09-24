package com.ssafy.a310.bank.common.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.a310.bank.account.repository.QBankAccountEntity;
import com.ssafy.a310.bank.account.repository.TransactionEntity;
import com.ssafy.a310.bank.account.service.query.BankAccountNumberQueryDslOrdering;
import com.ssafy.a310.bank.common.controller.query.dto.CursorPageResp;
import com.ssafy.a310.bank.common.controller.query.dto.CursorPagingParam;
import com.ssafy.a310.bank.common.controller.query.dto.PageInfoResp;
import com.ssafy.a310.bank.common.service.query.QueryDslConditionBuilder;
import com.ssafy.a310.bank.common.service.query.QueryDslOrdering;

import java.util.ArrayList;
import java.util.List;

public class CursorPagingRepository<T> {
    protected final QueryDslConditionBuilder queryDslConditionBuilder;
    protected final JPAQueryFactory queryFactory;
    protected final EntityPathBase<T> entityPathBase;

    private final QBaseEntity qBaseEntity = QBaseEntity.baseEntity;

    public CursorPagingRepository(QueryDslConditionBuilder queryDslConditionBuilder, JPAQueryFactory queryFactory, EntityPathBase<T> entityPathBase) {
        this.queryDslConditionBuilder = queryDslConditionBuilder;
        this.queryFactory = queryFactory;
        this.entityPathBase = entityPathBase;
    }

    protected JPAQuery<T> createQuery(BooleanExpression explicitSearchCondition, CursorPagingParam param) {
        // 기본 검색 조건 생성
        BooleanBuilder searchCondition = queryDslConditionBuilder.buildQueryDslWhereStatement(param.getSegment());
        searchCondition.and(explicitSearchCondition);

        // 페이징을 위한 식별자 비교 조건
        BooleanBuilder pagingCondition = new BooleanBuilder();
        if (!param.isFirstPage()) {
            pagingCondition.and(qBaseEntity.uuid.gt(param.getLastUuid()));
        }

        // 명시적인 정렬 조건 + 페이징을 위한 정렬 조건
        List<OrderSpecifier<? extends Comparable<?>>> orders = new ArrayList<>();
        if (param.getOrderKey() != null) {
            String orderKey = param.getOrderKey();
            boolean isAscending = param.getOrderDirection() == null || param.getOrderDirection().equalsIgnoreCase("asc");
            QueryDslOrdering ordering = new BankAccountNumberQueryDslOrdering(orderKey, isAscending);
            OrderSpecifier order = ordering.getOrderSpecifier();
            orders.add(order);
        }
        // Warning : 항상 명시적인 정렬 조건 뒤에 페이징을 위한 정렬 조건을 추가해야 함
        OrderSpecifier<String> orderForPaging = QBankAccountEntity.bankAccountEntity.uuid.asc();
        orders.add(orderForPaging);

        return queryFactory.selectFrom(entityPathBase)
                .where(pagingCondition.and(searchCondition))
                .orderBy(orders.toArray(new OrderSpecifier[0]))
                .limit(param.getPageSize() + 1); // 다음 페이지가 있는지 확인하기 위해 1개 더 가져옴
    }

    protected CursorPageResp<T> runQuery(JPAQuery<T> query, CursorPagingParam param) {
        List<T> entities = query.fetch();
        entities = entities.subList(0, Math.min(entities.size(), param.getPageSize()));

        System.out.println("Query : " + query);

        PageInfoResp pageInfoResp = new PageInfoResp(
                entities.size() > param.getPageSize(),
                param.getPageSize(),
                entities.size()
        );

        System.out.println("Result size : " + entities.size());
        if (entities.size() > 1 && entities.get(0) instanceof TransactionEntity transactionEntity) {
            System.out.println("HELP : " + transactionEntity.getReceiver().getNumber());
        }

        return new CursorPageResp<>(pageInfoResp, entities);
    }
}
