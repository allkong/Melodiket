package com.ssafy.a310.bank.account.service.domain;

import com.ssafy.a310.bank.account.repository.TransactionEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Data
public class BankTransaction {
    private int amount;
    private String uuid;
    private String senderName;
    private String receiverAccountNumber;
    private LocalDateTime createdAt;

    public BankTransaction(TransactionEntity entity) {
        this.amount = entity.getAmount();
        this.uuid = entity.getUuid();
        this.senderName = entity.getSenderName();
        this.receiverAccountNumber = entity.getReceiver().getNumber();
        this.createdAt = entity.getCreatedAt();
    }

    public static List<BankTransaction> fromEntities(List<TransactionEntity> entities) {
        return entities.stream()
                .map(BankTransaction::new)
                .toList();
    }
}
