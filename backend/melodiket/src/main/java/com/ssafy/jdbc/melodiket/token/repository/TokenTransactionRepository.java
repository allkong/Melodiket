package com.ssafy.jdbc.melodiket.token.repository;

import com.ssafy.jdbc.melodiket.token.entity.TokenTransactionLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenTransactionRepository extends JpaRepository<TokenTransactionLogEntity, Long> {
}
