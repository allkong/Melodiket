package com.ssafy.a310.bank.common.service.query;

import com.querydsl.core.types.OrderSpecifier;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public abstract class QueryDslOrdering {
    protected String orderKey;
    protected boolean ascending;

    public abstract OrderSpecifier<? extends Comparable<?>> getOrderSpecifier();
}
