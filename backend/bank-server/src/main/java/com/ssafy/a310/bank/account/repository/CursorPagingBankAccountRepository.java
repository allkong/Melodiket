package com.ssafy.a310.bank.account.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.a310.bank.account.controller.dto.BankAccountCursorPagingParam;
import com.ssafy.a310.bank.account.service.query.BankAccountFilteringCondition;
import com.ssafy.a310.bank.common.controller.query.dto.CursorPageResp;
import com.ssafy.a310.bank.common.repository.CursorPagingRepository;
import com.ssafy.a310.bank.common.service.query.QueryDslConditionBuilder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CursorPagingBankAccountRepository extends CursorPagingRepository<BankAccountEntity> {
    private static final QBankAccountEntity qBankAccountEntity = QBankAccountEntity.bankAccountEntity;
    private static final QTransactionEntity qTransactionEntity = QTransactionEntity.transactionEntity;
    private final BankAccountRepository bankAccountRepository;

    public CursorPagingBankAccountRepository(QueryDslConditionBuilder<BankAccountFilteringCondition> queryDslConditionBuilder, JPAQueryFactory queryFactory, BankAccountRepository bankAccountRepository, TransactionRepository transactionRepository) {
        super(queryDslConditionBuilder, queryFactory, QBankAccountEntity.bankAccountEntity);
        this.bankAccountRepository = bankAccountRepository;
    }

    public Optional<BankAccountEntity> findByAccountNumber(String accountNumber) {
        return bankAccountRepository.findByNumber(accountNumber);
    }

    public int countByUserUuid(String userUuid) {
        return (int) queryFactory.selectFrom(qBankAccountEntity)
                .where(qBankAccountEntity.user.uuid.eq(userUuid))
                .fetchCount();
    }

    public BankAccountEntity save(BankAccountEntity entity) {
        return bankAccountRepository.save(entity);
    }

    public CursorPageResp<BankAccountEntity> getBankAccountsOf(String userUuid, BankAccountCursorPagingParam param) {
        BooleanExpression userOwnerCondition = qBankAccountEntity.user.uuid.eq(userUuid);
        JPAQuery<BankAccountEntity> query = createQuery(userOwnerCondition, param);
        return runQuery(query, param);
    }

    public int getBalanceOf(String accountNumber) {
        List<TransactionEntity> entities = queryFactory.selectFrom(qTransactionEntity)
                .leftJoin(qTransactionEntity.sender)
                .leftJoin(qTransactionEntity.receiver)
                .where(
                        qTransactionEntity.sender.number.eq(accountNumber)
                                .or(qTransactionEntity.receiver.number.eq(accountNumber))
                )
                .fetch();
        System.out.println("Target account number : " + accountNumber);
        System.out.println("Number of Entity : " + entities.size());
        System.out.println(queryFactory.selectFrom(qTransactionEntity)
                .leftJoin(qTransactionEntity.sender)
                .leftJoin(qTransactionEntity.receiver)
                .where(
                        qTransactionEntity.sender.number.eq(accountNumber)
                                .or(qTransactionEntity.receiver.number.eq(accountNumber))
                ));
        return entities.stream()
                .map((transaction) -> {
                    if (transaction.getSender() != null && transaction.getSender().getNumber().equals(accountNumber)) {
                        return -transaction.getAmount();
                    } else {
                        return transaction.getAmount();
                    }
                })
                .reduce(0, Integer::sum);
    }


    public Optional<BankAccountEntity> findByUuid(String uuid) {
        return bankAccountRepository.findByUuid(uuid);
    }


}
