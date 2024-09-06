package com.ssafy.a310.bank.account.service.query;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.a310.bank.account.repository.QBankAccountEntity;
import com.ssafy.a310.bank.common.service.query.FilteringSegmentOperator;
import com.ssafy.a310.bank.common.service.query.QueryDslFilteringCondition;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BankAccountFilteringCondition extends QueryDslFilteringCondition {
    private static final QBankAccountEntity bankAccount = QBankAccountEntity.bankAccountEntity;

    public BankAccountFilteringCondition(String key, FilteringSegmentOperator operator, Object value) {
        super(key, operator, value);
    }

    @Override
    public BooleanExpression getEqExpression() {
        if (key.equals("bankName") && value instanceof String string) {
            return (bankAccount.bankName.eq(string));
        } else if (key.equals("userUuid") && value instanceof String string) {
            return (bankAccount.user.uuid.eq(string));
        } else {
            throw new IllegalArgumentException("Unsupported key-value pair for EQUALS operation: " + key + " - " + value);
        }
    }

    @Override
    public BooleanExpression getGtExpression() {
        if (key.equals("createdAt") && isLocalDatetimeParsable()) {
            LocalDateTime dt = parseLocalDateTime();
            return (bankAccount.createdAt.after(dt));
        } else if (key.equals("lastTransactionAt") && isLocalDatetimeParsable()) {
            LocalDateTime dt = parseLocalDateTime();
            return (bankAccount.lastTransactionAt.after(dt));
        } else {
            throw new IllegalArgumentException("Unsupported key-value pair for GREATER THAN operation: " + key + " - " + value);
        }
    }

    @Override
    public BooleanExpression getGeExpression() {
        if (key.equals("createdAt") && isLocalDatetimeParsable()) {
            LocalDateTime dt = parseLocalDateTime();
            return (bankAccount.createdAt.goe(dt));
        } else if (key.equals("lastTransactionAt") && isLocalDatetimeParsable()) {
            LocalDateTime dt = parseLocalDateTime();
            return (bankAccount.lastTransactionAt.goe(dt));
        } else {
            throw new IllegalArgumentException("Unsupported key-value pair for GREATER THAN OR EQUALS operation: " + key + " - " + value);
        }
    }

    @Override
    public BooleanExpression getLtExpression() {
        if (key.equals("createdAt") && isLocalDatetimeParsable()) {
            LocalDateTime dt = parseLocalDateTime();
            return (bankAccount.createdAt.before(dt));
        } else if (key.equals("lastTransactionAt") && isLocalDatetimeParsable()) {
            LocalDateTime dt = parseLocalDateTime();
            return (bankAccount.lastTransactionAt.before(dt));
        } else {
            throw new IllegalArgumentException("Unsupported key-value pair for LESS THAN operation: " + key + " - " + value);
        }
    }

    @Override
    public BooleanExpression getLeExpression() {
        if (key.equals("createdAt") && isLocalDatetimeParsable()) {
            LocalDateTime dt = parseLocalDateTime();
            return (bankAccount.createdAt.loe(dt));
        } else if (key.equals("lastTransactionAt") && isLocalDatetimeParsable()) {
            LocalDateTime dt = parseLocalDateTime();
            return (bankAccount.lastTransactionAt.loe(dt));
        } else {
            throw new IllegalArgumentException("Unsupported key-value pair for LESS THAN OR EQUALS operation: " + key + " - " + value);
        }
    }
}
