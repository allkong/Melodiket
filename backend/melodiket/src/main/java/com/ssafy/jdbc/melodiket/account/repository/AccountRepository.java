package com.ssafy.jdbc.melodiket.account.repository;

import com.ssafy.jdbc.melodiket.account.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    boolean existsAccountEntityByNumber(String number);
}
