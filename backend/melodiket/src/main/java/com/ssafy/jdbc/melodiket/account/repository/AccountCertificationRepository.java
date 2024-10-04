package com.ssafy.jdbc.melodiket.account.repository;

import com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountCertificationRepository extends JpaRepository<AccountCertificationEntity, Long> {
    Optional<AccountCertificationEntity> findByNumberAndAppUserEntity_LoginId(String number, String loginId);

    Optional<AccountCertificationEntity> findBySecret(String secret);
}
