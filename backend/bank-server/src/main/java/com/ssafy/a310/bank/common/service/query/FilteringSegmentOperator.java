package com.ssafy.a310.bank.common.service.query;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FilteringSegmentOperator {
    EQ("==", "="),
    NE("!=", "!="),
    GT(">", ">"),
    GE(">=", ">="),
    LT("<", "<"),
    LE("<=", "<="),
    IN("=@", "IN"),
    NIN("!@", "NOT IN"),
    STARTS_WITH("=~", "STARTS WITH"),
    ENDS_WITH("=$", "ENDS WITH"),
    ;
    private final String value;
    private final String representation;
}
