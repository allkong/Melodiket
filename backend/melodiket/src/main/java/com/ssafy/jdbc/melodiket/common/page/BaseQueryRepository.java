package com.ssafy.jdbc.melodiket.common.page;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

public abstract class BaseQueryRepository<T extends ExposableEntity, R> {

    protected final PathBuilder<T> entityPath;
    private final JPAQueryFactory jpaQueryFactory;
    private final Class<T> entityClass;
    private final ErrorDetail errorDetail;

    protected BaseQueryRepository(JPAQueryFactory jpaQueryFactory, Class<T> entityClass, ErrorDetail errorDetail) {
        this.jpaQueryFactory = jpaQueryFactory;
        this.entityClass = entityClass;
        this.entityPath = new PathBuilder<>(entityClass, convertFirstCharToLowercase(entityClass));
        this.errorDetail = errorDetail;
    }

    protected Optional<Long> findIdByUuid(UUID uuid) {
        Long id = jpaQueryFactory
                .select(entityPath.getNumber("id", Long.class))
                .from(entityPath)
                .where(entityPath.get("uuid").eq(uuid))
                .fetchOne();

        return Optional.ofNullable(id);  // Optional로 반환
    }

    public PageResponse<R> findWithPagination(CursorPagingReq req, Function<T, R> entityConverter, BooleanExpression... conditions) {
        return findWithPagination(Sort.by(Sort.Order.by(req.getOrderKey()).with(Sort.Direction.fromString(req.getOrderDirection()))),
                req.getLastUuid(), req.isFirstPage(), req.getPageSize(), entityConverter, conditions);
    }

    // 공통적인 페이지네이션 메소드
    public PageResponse<R> findWithPagination(Sort sort, UUID lastCursor, Boolean isFirstPage, int pageSize, Function<T, R> entityConverter, BooleanExpression... conditions) {
        // lastCursor가 있으면 이를 ID로 변환해서 커서 조건 처리
        Long lastCursorId = (lastCursor == null || isFirstPage) ?
                null :
                findIdByUuid(lastCursor)
                        .orElseThrow(() -> new HttpResponseException(errorDetail));

        // 동적 where 조건 추가 및 커서 처리
        BooleanExpression cursorCondition = cursorCondition(lastCursorId);
        List<T> entities = jpaQueryFactory
                .selectFrom(entityPath)
                .where(cursorCondition, mergeConditions(conditions))  // 동적 필터 적용
                .orderBy(getOrderSpecifier(sort).toArray(OrderSpecifier[]::new))  // 동적 정렬 적용
                .limit(pageSize + 1L)
                .fetch();

        boolean hasNext = entities.size() > pageSize;
        List<T> result = hasNext ? entities.subList(0, pageSize) : entities;
        UUID nextCursor = hasNext ? result.get(result.size() - 1).getUuid() : null;
        List<R> responses = entities.stream().map(entityConverter).toList();

        PageInfoCursor pageInfo = new PageInfoCursor(hasNext, pageSize, responses.size(), nextCursor);
        return new PageResponse<R>(pageInfo, responses);
    }

    protected List<OrderSpecifier<?>> getOrderSpecifier(Sort sort) {
        List<OrderSpecifier<?>> orders = new ArrayList<>();
        sort.stream().forEach(order -> {
            Order direction = order.isAscending() ? Order.ASC : Order.DESC;
            String prop = order.getProperty();
            orders.add(new OrderSpecifier(direction, entityPath.get(prop)));
        });
        return orders;
    }

    // 커서 처리 - ID를 기준으로 커서를 넘길 때 사용
    protected BooleanExpression cursorCondition(Long lastCursorId) {
        if (lastCursorId == null) {
            return null;
        }
        return entityPath.getNumber("id", Long.class).gt(lastCursorId);
    }


    // 여러 조건을 병합하기 위한 메소드
    protected BooleanExpression mergeConditions(BooleanExpression... conditions) {
        BooleanExpression result = null;
        for (BooleanExpression condition : conditions) {
            if (condition != null) {
                result = result == null ? condition : result.and(condition);
            }
        }
        return result;
    }

    public String convertFirstCharToLowercase(Class<?> entityClass) {
        String simpleName = entityClass.getSimpleName();
        if (simpleName == null || simpleName.isEmpty()) {
            return simpleName;
        }
        return Character.toLowerCase(simpleName.charAt(0)) + simpleName.substring(1);
    }
}
