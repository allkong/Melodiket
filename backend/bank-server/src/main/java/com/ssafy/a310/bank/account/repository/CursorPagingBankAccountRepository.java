package com.ssafy.a310.bank.account.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.a310.bank.account.controller.dto.BankAccountCursorPagingParam;
import com.ssafy.a310.bank.common.controller.query.dto.CursorPageResp;
import com.ssafy.a310.bank.common.repository.CursorPagingRepository;
import com.ssafy.a310.bank.common.service.query.QueryDslConditionBuilder;
import org.springframework.stereotype.Repository;

@Repository
public class CursorPagingBankAccountRepository extends CursorPagingRepository<BankAccountEntity> {
    private static final QBankAccountEntity qBankAccountEntity = QBankAccountEntity.bankAccountEntity;
    private final BankAccountRepository bankAccountRepository;

    public CursorPagingBankAccountRepository(QueryDslConditionBuilder queryDslConditionBuilder, JPAQueryFactory queryFactory, BankAccountRepository bankAccountRepository) {
        super(queryDslConditionBuilder, queryFactory, QBankAccountEntity.bankAccountEntity);
        this.bankAccountRepository = bankAccountRepository;
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
}
