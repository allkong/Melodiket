package com.ssafy.jdbc.melodiket.token.entity;

import com.ssafy.jdbc.melodiket.account.service.AccountService;
import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "token_transaction_log")
public class TokenTransactionLogEntity extends ExposableEntity {
    public static final String SYSTEM_NAME = "SYSTEM"; // 토큰 관리 계정 식별자

    @Column(nullable = false)
    private String fromIdentifier; // 보낸 사람 식별자 (별명)

    @Column(nullable = false)
    private String toIdentifier; // 받는 사람 식별자 (별명)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountService.LogType logType;

    @Column(nullable = false)
    private long amount;
}
