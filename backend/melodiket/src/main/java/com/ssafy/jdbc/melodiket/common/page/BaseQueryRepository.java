package com.ssafy.jdbc.melodiket.common.page;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparablePath;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import org.springframework.data.domain.Sort;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
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

    public PageResponse<R> findWithPagination(CursorPagingReq req, Function<T, R> entityConverter, BooleanExpression... conditions) {
        Sort sort = Sort.by(Sort.Order.by(req.getOrderKey()).with(Sort.Direction.fromString(req.getOrderDirection())));
        return findWithPagination(sort, req.getLastUuid(), req.isFirstPage(), req.getPageSize(), entityConverter, conditions);
    }

    public PageResponse<R> findWithPagination(Sort sort, UUID lastCursor, Boolean isFirstPage, int pageSize, Function<T, R> entityConverter, BooleanExpression... conditions) {
        // 정렬 키와 방향 추출
        Sort.Order primaryOrder = sort.iterator().next();
        String orderKey = primaryOrder.getProperty();
        Order sortOrder = primaryOrder.isAscending() ? Order.ASC : Order.DESC;

        // lastCursor가 있으면 이를 사용하여 커서 조건 처리
        Long lastCursorId = null;
        Object lastCursorValue = null;
        if (!(lastCursor == null || isFirstPage)) {
            // 이전 커서의 orderKey 값과 ID를 가져옴
            T lastEntity = jpaQueryFactory
                    .selectFrom(entityPath)
                    .where(entityPath.get("uuid").eq(lastCursor))
                    .fetchOne();
            if (lastEntity == null) {
                throw new HttpResponseException(errorDetail);
            }
            lastCursorId = lastEntity.getId();
            lastCursorValue = getValueFromEntity(lastEntity, orderKey);
        }

        // 커서 조건 생성 시 정렬 키와 값 전달
        BooleanExpression cursorCondition = cursorCondition(lastCursorValue, lastCursorId, orderKey, sortOrder);

        // 조건을 기반으로 쿼리 실행
        List<OrderSpecifier<?>> orderSpecifiers = getOrderSpecifier(sort);
        List<T> entities = jpaQueryFactory
                .selectFrom(entityPath)
                .where(cursorCondition, mergeConditions(conditions))
                .orderBy(orderSpecifiers.toArray(OrderSpecifier[]::new))
                .limit(pageSize + 1L)
                .fetch();

        boolean hasNext = entities.size() > pageSize;
        List<T> result = hasNext ? entities.subList(0, pageSize) : entities;
        UUID nextCursor = hasNext ? result.get(result.size() - 1).getUuid() : null;
        List<R> responses = result.stream().map(entityConverter).toList();

        PageInfoCursor pageInfo = new PageInfoCursor(hasNext, pageSize, responses.size(), nextCursor);
        return new PageResponse<R>(pageInfo, responses);
    }

    protected List<OrderSpecifier<?>> getOrderSpecifier(Sort sort) {
        List<OrderSpecifier<?>> orders = new ArrayList<>();
        sort.forEach(order -> {
            Order direction = order.isAscending() ? Order.ASC : Order.DESC;
            String prop = order.getProperty();
            PathBuilder<Object> path = entityPath.get(prop);
            orders.add(new OrderSpecifier(direction, path));
        });

        // 항상 'id'를 정렬 조건에 추가합니다.
        Sort.Order primaryOrder = sort.iterator().next();
        Order direction = primaryOrder.isAscending() ? Order.ASC : Order.DESC;
        NumberPath<Long> idPath = entityPath.getNumber("id", Long.class);
        orders.add(new OrderSpecifier<>(direction, idPath));

        return orders;
    }


    // 커서 처리 - ID를 기준으로 커서를 넘길 때 사용
    protected BooleanExpression cursorCondition(Object lastCursorValue, Long lastCursorId, String orderKey, Order sortOrder) {
        if (lastCursorId == null || lastCursorValue == null) {
            return null;
        }

        // lastCursorValue의 클래스 타입을 가져옴
        Class<?> valueClass = lastCursorValue.getClass();
        Class<? extends Comparable<?>> comparableClass = (Class<? extends Comparable<?>>) valueClass;
// 정렬 키에 대한 ComparableExpression 생성
        ComparablePath orderKeyPath = entityPath.getComparable(orderKey, comparableClass);

        NumberPath<Long> idPath = entityPath.getNumber("id", Long.class);

        @SuppressWarnings("unchecked")
        Comparable<Object> lastComparableValue = (Comparable<Object>) lastCursorValue;

        BooleanExpression condition = null;

        if (sortOrder == Order.ASC) {
            // 조건 분기 처리
            BooleanExpression orderKeyGreater = orderKeyPath.gt(lastComparableValue);
            BooleanExpression orderKeyEquals = orderKeyPath.eq(lastComparableValue);
            BooleanExpression idGreater = idPath.gt(lastCursorId);

            condition = orderKeyGreater.or(orderKeyEquals.and(idGreater));
        } else {
            // DESC의 경우
            BooleanExpression orderKeyLess = orderKeyPath.lt(lastComparableValue);
            BooleanExpression orderKeyEquals = orderKeyPath.eq(lastComparableValue);
            BooleanExpression idLess = idPath.lt(lastCursorId);

            condition = orderKeyLess.or(orderKeyEquals.and(idLess));
        }

        return condition;
    }

    protected Object getValueFromEntity(T entity, String fieldName) {
        try {
            String methodName = "get" + capitalize(fieldName);
            Method method = entity.getClass().getMethod(methodName);
            return method.invoke(entity);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            throw new RuntimeException("Failed to get value from entity", e);
        }
    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return Character.toUpperCase(str.charAt(0)) + str.substring(1);
    }

    protected BooleanExpression mergeConditions(BooleanExpression... conditions) {
        BooleanExpression result = null;
        for (BooleanExpression condition : conditions) {
            if (condition != null) {
                result = (result == null) ? condition : result.and(condition);
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
