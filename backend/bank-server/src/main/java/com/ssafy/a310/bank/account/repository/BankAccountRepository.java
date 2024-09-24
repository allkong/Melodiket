package com.ssafy.a310.bank.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccountEntity, Integer>, JpaSpecificationExecutor<BankAccountEntity> {
    Optional<BankAccountEntity> findByNumber(String number);

    Optional<BankAccountEntity> findByUuid(String uuid);
}