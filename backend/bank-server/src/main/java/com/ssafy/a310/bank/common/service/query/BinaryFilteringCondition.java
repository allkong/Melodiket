package com.ssafy.a310.bank.common.service.query;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BinaryFilteringCondition implements FilteringCondition {
    private String key;
    private FilteringSegmentOperator operator;
    private Comparable value;

    @Override
    public String toString() {
        return String.format("%s %s %s", key, operator.getRepresentation(), value);
    }
}
