package com.ssafy.jdbc.melodiket.wallet.repository;

import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.wallet.entity.WalletInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<WalletInfoEntity, Long> {
    Optional<WalletInfoEntity> findByUser(AppUserEntity user);
}
