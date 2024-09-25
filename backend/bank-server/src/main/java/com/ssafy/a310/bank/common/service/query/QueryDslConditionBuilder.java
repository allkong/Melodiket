package com.ssafy.a310.bank.common.service.query;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QueryDslConditionBuilder<T extends QueryDslFilteringCondition> {
    private final String AND_SPLITTER = ",";
    private final String OR_SPLITTER = ";";

    public BooleanBuilder buildQueryDslWhereStatement(List<String> segments) {
        BooleanBuilder finalBuilder = new BooleanBuilder();

        for (String segment : segments) {
            BooleanBuilder segmentBuilder = new BooleanBuilder();
            String[] andConditions = segment.split(AND_SPLITTER);
            for (String andCondition : andConditions) {
                BooleanBuilder orBuilder = new BooleanBuilder();
                String[] orConditions = andCondition.split(OR_SPLITTER);
                for (String condition : orConditions) {
                    BooleanExpression conditionExpression = parseSegment(condition).getExpression();
                    if (orBuilder.hasValue()) {
                        orBuilder.or(conditionExpression);
                    } else {
                        orBuilder.and(conditionExpression);
                    }
                }
                segmentBuilder.and(orBuilder);
            }
            finalBuilder.and(segmentBuilder);
        }

        return finalBuilder;
    }

    private QueryDslFilteringCondition parseSegment(String segment) {
        FilteringSegmentOperator[] operators = FilteringSegmentOperator.values();
        for (FilteringSegmentOperator operator : operators) {
            String splitter = operator.getValue();
            int index = segment.indexOf(splitter);
            if (index > 0) {
                String key = segment.substring(0, index);
                String value = segment.substring(index + splitter.length());
                return T.of(key, operator, value);
            }
        }

        throw new IllegalArgumentException("Invalid segment: " + segment);
    }
}
