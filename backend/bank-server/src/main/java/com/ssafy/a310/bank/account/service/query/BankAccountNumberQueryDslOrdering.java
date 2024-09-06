package com.ssafy.a310.bank.account.service.query;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.ssafy.a310.bank.account.repository.QBankAccountEntity;
import com.ssafy.a310.bank.common.service.query.QueryDslOrdering;

public class BankAccountNumberQueryDslOrdering extends QueryDslOrdering {
    public BankAccountNumberQueryDslOrdering(String orderKey, boolean ascending) {
        super(orderKey, ascending);
    }

    @Override
    public OrderSpecifier<? extends Comparable<?>> getOrderSpecifier() {
        ComparableExpressionBase<? extends Comparable<?>> path = null;
        if (orderKey.equals("uuid")) {
            path = QBankAccountEntity.bankAccountEntity.uuid;
        } else if (orderKey.equals("bankName")) {
            path = QBankAccountEntity.bankAccountEntity.bankName;
        } else if (orderKey.equals("number")) {
            path = QBankAccountEntity.bankAccountEntity.number;
        } else if (orderKey.equals("createdAt")) {
            path = QBankAccountEntity.bankAccountEntity.createdAt;
        } else if (orderKey.equals("lastTransactionAt")) {
            path = QBankAccountEntity.bankAccountEntity.lastTransactionAt;
        } else {
            throw new IllegalArgumentException("Unknown order key: " + orderKey);
        }
        return ascending ? path.asc() : path.desc();
    }
}
