package com.ssafy.a310.bank.account.service.query;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.a310.bank.account.repository.QTransactionEntity;
import com.ssafy.a310.bank.common.service.query.FilteringSegmentOperator;
import com.ssafy.a310.bank.common.service.query.QueryDslFilteringCondition;

public class BankTransactionFilteringCondition extends QueryDslFilteringCondition {
    private static final QTransactionEntity transactionEntity = QTransactionEntity.transactionEntity;

    public BankTransactionFilteringCondition(String key, FilteringSegmentOperator operator, Object value) {
        super(key, operator, value);
    }

    @Override
    public BooleanExpression getEqExpression() {
        if (key.equals("senderAccountNumber") && value instanceof String string) {
            return (transactionEntity.sender.number.eq(string));
        } else if (key.equals("receiverAccountNumber") && value instanceof String string) {
            return (transactionEntity.receiver.number.eq(string));
        } else {
            throw new IllegalArgumentException("Unsupported key-value pair for EQUALS operation: " + key + " - " + value);
        }
    }
}
