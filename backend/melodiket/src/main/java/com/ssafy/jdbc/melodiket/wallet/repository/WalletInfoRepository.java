package com.ssafy.jdbc.melodiket.wallet.repository;

import com.ssafy.jdbc.melodiket.wallet.entity.WalletInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletInfoRepository extends JpaRepository<WalletInfoEntity, Long> {
}
