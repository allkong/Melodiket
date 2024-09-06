package com.ssafy.a310.bank.common.service.query;

import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public abstract class QueryDslFilteringCondition {
    protected String key;
    protected FilteringSegmentOperator operator;
    protected Object value;

    @Override
    public String toString() {
        return String.format("%s %s %s", key, operator.getRepresentation(), value);
    }

    protected boolean isLocalDatetimeParsable() {
        return value instanceof String && ((String) value).matches("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}$");
    }

    public LocalDateTime parseLocalDateTime() {
        if (!isLocalDatetimeParsable()) {
            throw new IllegalArgumentException("Value is not parsable as LocalDateTime: " + value);
        }
        return LocalDateTime.parse((String) value);
    }

    public BooleanExpression getExpression() {
        switch (operator) {
            case EQ:
                return getEqExpression();
            case NE:
                return getNeExpression();
            case GT:
                return getGtExpression();
            case GE:
                return getGeExpression();
            case LT:
                return getLtExpression();
            case LE:
                return getLeExpression();
            case IN:
                return getInExpression();
            case NIN:
                return getNinExpression();
            case STARTS_WITH:
                return getStartsWithExpression();
            case ENDS_WITH:
                return getEndsWithExpression();
            default:
                throw new IllegalArgumentException("Unknown operator: " + operator);
        }
    }

    public BooleanExpression getEqExpression() {
        throw new IllegalArgumentException("Unsupported 'eq' operation for this condition: " + this);
    }

    public BooleanExpression getNeExpression() {
        throw new IllegalArgumentException("Unsupported 'ne' operation for this condition: " + this);
    }

    public BooleanExpression getGtExpression() {
        throw new IllegalArgumentException("Unsupported 'gt' operation for this condition: " + this);
    }

    public BooleanExpression getGeExpression() {
        throw new IllegalArgumentException("Unsupported 'ge' operation for this condition: " + this);
    }

    public BooleanExpression getLtExpression() {
        throw new IllegalArgumentException("Unsupported 'lt' operation for this condition: " + this);
    }

    public BooleanExpression getLeExpression() {
        throw new IllegalArgumentException("Unsupported 'le' operation for this condition: " + this);
    }

    public BooleanExpression getInExpression() {
        throw new IllegalArgumentException("Unsupported 'in' operation for this condition: " + this);
    }

    public BooleanExpression getNinExpression() {
        throw new IllegalArgumentException("Unsupported 'nin' operation for this condition: " + this);
    }

    public BooleanExpression getStartsWithExpression() {
        throw new IllegalArgumentException("Unsupported 'startswith' operation for this condition: " + this);
    }

    public BooleanExpression getEndsWithExpression() {
        throw new IllegalArgumentException("Unsupported 'endswith' operation for this condition: " + this);
    }
}
