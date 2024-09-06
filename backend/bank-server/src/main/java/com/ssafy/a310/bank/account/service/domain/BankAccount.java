package com.ssafy.a310.bank.account.service.domain;

import com.ssafy.a310.bank.account.repository.BankAccountEntity;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class BankAccount {
    private final String uuid;
    private final String number;
    private final String bankName;
    private final LocalDateTime createdAt;
    private final LocalDateTime lastTransactionAt;
    private final String ownerUuid;

    public BankAccount(BankAccountEntity entity) {
        this.uuid = entity.getUuid();
        this.number = entity.getNumber();
        this.bankName = entity.getBankName();
        this.createdAt = entity.getCreatedAt();
        this.lastTransactionAt = entity.getLastTransactionAt();
        this.ownerUuid = entity.getUuid();
    }

    public static List<BankAccount> fromEntities(List<BankAccountEntity> entities) {
        return entities.stream()
                .map(BankAccount::new)
                .toList();
    }

    // xxxx-xxxx-xxx 형식의 계좌 번호를 임의로 생성
    public static String generateRandomNumber() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 11; i++) {
            sb.append((int) (Math.random() * 10));
            if (i % 4 == 3) {
                sb.append("-");
            }
        }
        return sb.toString();
    }
}
