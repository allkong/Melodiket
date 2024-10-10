package com.ssafy.jdbc.melodiket.account.repository;

import com.ssafy.jdbc.melodiket.account.entity.AccountEntity;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    boolean existsAccountEntityByNumber(String number);

    Optional<AccountEntity> findByAppUserEntityAndNumber(AppUserEntity user, String number);
}
