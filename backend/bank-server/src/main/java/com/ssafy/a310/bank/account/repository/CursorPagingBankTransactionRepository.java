package com.ssafy.a310.bank.account.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.a310.bank.account.controller.dto.BankTransactionCursorPagingParam;
import com.ssafy.a310.bank.account.service.query.BankTransactionFilteringCondition;
import com.ssafy.a310.bank.common.controller.query.dto.CursorPageResp;
import com.ssafy.a310.bank.common.repository.CursorPagingRepository;
import com.ssafy.a310.bank.common.service.query.QueryDslConditionBuilder;
import org.springframework.stereotype.Repository;

@Repository
public class CursorPagingBankTransactionRepository extends CursorPagingRepository<TransactionEntity> {
    private static final QTransactionEntity qTransactionEntity = QTransactionEntity.transactionEntity;
    private final TransactionRepository transactionRepository;

    public CursorPagingBankTransactionRepository(QueryDslConditionBuilder<BankTransactionFilteringCondition> queryDslConditionBuilder, JPAQueryFactory queryFactory, TransactionRepository transactionRepository) {
        super(queryDslConditionBuilder, queryFactory, QTransactionEntity.transactionEntity);
        this.transactionRepository = transactionRepository;
    }

    public TransactionEntity saveTransaction(TransactionEntity entity) {
        return transactionRepository.save(entity);
    }

    public CursorPageResp<TransactionEntity> getTransactionsOf(String accountNumber, BankTransactionCursorPagingParam pagingParam) {
        BooleanExpression userOwnerCondition = qTransactionEntity.sender.number.eq(accountNumber)
                .or(qTransactionEntity.receiver.number.eq(accountNumber));
        JPAQuery<TransactionEntity> query = queryFactory.selectFrom(qTransactionEntity)
                .leftJoin(qTransactionEntity.sender)
                .leftJoin(qTransactionEntity.receiver)
                .where(userOwnerCondition)
                .orderBy(qTransactionEntity.createdAt.desc());
        return runQuery(query, pagingParam);
    }
}
