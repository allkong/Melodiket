package com.ssafy.a310.bank.common.service.query.converter;

import com.ssafy.a310.bank.common.service.query.AndCondition;
import com.ssafy.a310.bank.common.service.query.BinaryFilteringCondition;
import com.ssafy.a310.bank.common.service.query.FilteringCondition;
import com.ssafy.a310.bank.common.service.query.OrCondition;
import jakarta.persistence.criteria.Path;
import org.springframework.data.jpa.domain.Specification;

public class SpecificationConverter<T> {
    public Specification<T> toSpecification(FilteringCondition condition) {
        if (condition instanceof BinaryFilteringCondition) {
            return buildSpecification((BinaryFilteringCondition) condition);
        } else if (condition instanceof AndCondition) {
            return buildAndSpecification((AndCondition) condition);
        } else if (condition instanceof OrCondition) {
            return buildOrSpecification((OrCondition) condition);
        }
        throw new IllegalArgumentException("Unknown condition type");
    }

    private Specification<T> buildSpecification(BinaryFilteringCondition condition) {
        return (root, query, criteriaBuilder) -> {
            Path<Comparable> path = root.get(condition.getKey());
            switch (condition.getOperator()) {
                case EQ:
                    return criteriaBuilder.equal(path, condition.getValue());
                case NE:
                    return criteriaBuilder.notEqual(path, condition.getValue());
                case GT:
                    return criteriaBuilder.greaterThan(path, condition.getValue());
                case GE:
                    return criteriaBuilder.greaterThanOrEqualTo(path, condition.getValue());
                case LT:
                    return criteriaBuilder.lessThan(path, condition.getValue());
                case LE:
                    return criteriaBuilder.lessThanOrEqualTo(path, condition.getValue());
                case IN:
                    return path.in(condition.getValue());
                case NIN:
                    return criteriaBuilder.not(path.in(condition.getValue()));
                default:
                    throw new IllegalArgumentException("Unknown operator: " + condition.getOperator());
            }
        };
    }

    private Specification<T> buildAndSpecification(AndCondition condition) {
        Specification<T> spec = null;
        for (FilteringCondition subCondition : condition.getConditions()) {
            if (spec == null) {
                spec = toSpecification(subCondition);
            } else {
                spec = spec.and(toSpecification(subCondition));
            }
        }
        return spec;
    }

    private Specification<T> buildOrSpecification(OrCondition condition) {
        Specification<T> spec = null;
        for (FilteringCondition subCondition : condition.getConditions()) {
            if (spec == null) {
                spec = toSpecification(subCondition);
            } else {
                spec = spec.or(toSpecification(subCondition));
            }
        }
        return spec;
    }
}
