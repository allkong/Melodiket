package com.ssafy.a310.bank.common.service.query;

import java.util.List;

public class ConditionBuilder {
    public FilteringCondition build(List<String> segments) {
        AndCondition rootCondition = new AndCondition();

        for (String andSegment : segments) {
            AndCondition andCondition = new AndCondition();
            String[] subSegments = andSegment.split(";");
            for (String subSegment : subSegments) {
                OrCondition orCondition = new OrCondition();

                String[] orSegments = subSegment.split(",");
                for (String orSegment : orSegments) {
                    BinaryFilteringCondition condition = parseSegment(orSegment);
                    orCondition.add(condition);
                }

                if (!orCondition.getConditions().isEmpty()) {
                    andCondition.add(orCondition);
                }
            }

            if (!andCondition.getConditions().isEmpty()) {
                rootCondition.add(andCondition);
            }
        }

        return rootCondition;
    }

    private BinaryFilteringCondition parseSegment(String segment) {
        FilteringSegmentOperator[] operators = FilteringSegmentOperator.values();
        for (FilteringSegmentOperator operator : operators) {
            String splitter = operator.getValue();
            int index = segment.indexOf(splitter);
            if (index > 0) {
                String key = segment.substring(0, index);
                String value = segment.substring(index + splitter.length());
                return new BinaryFilteringCondition(key, operator, value);
            }
        }

        throw new IllegalArgumentException("Invalid segment: " + segment);
    }
}
