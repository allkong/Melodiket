package com.ssafy.a310.bank.common.service.query;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class OrCondition implements FilteringCondition {
    private final List<FilteringCondition> conditions = new ArrayList<>();

    public void add(FilteringCondition condition) {
        conditions.add(condition);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("(");
        for (FilteringCondition condition : conditions) {
            sb.append(condition.toString());
            sb.append(" OR ");
        }
        sb.delete(sb.length() - 4, sb.length());
        sb.append(")");
        return sb.toString();
    }
}
