package com.ssafy.a310.bank.account.repository;

import com.ssafy.a310.bank.common.repository.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "transaction")
@Entity
public class TransactionEntity extends BaseEntity {
    @Column(name = "sender_name", updatable = false, nullable = false)
    private String senderName;

    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    private BankAccountEntity sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", referencedColumnName = "id")
    private BankAccountEntity receiver;

    @Column(name = "amount", nullable = false)
    private int amount;
}
