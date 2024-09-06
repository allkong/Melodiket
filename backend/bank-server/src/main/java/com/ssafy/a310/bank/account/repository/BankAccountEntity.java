package com.ssafy.a310.bank.account.repository;

import com.ssafy.a310.bank.common.repository.BaseEntity;
import com.ssafy.a310.bank.user.repository.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "bank_account")
@Entity
public class BankAccountEntity extends BaseEntity {
    @Column(name = "number", nullable = false, unique = true)
    private String number;

    @Column(name = "bank_name", nullable = false, updatable = false)
    private String bankName;

    @Column(name = "last_transaction_at")
    private LocalDateTime lastTransactionAt;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @OneToMany(mappedBy = "sender")
    private List<TransactionEntity> senderTransactions;

    @OneToMany(mappedBy = "receiver")
    private List<TransactionEntity> receiverTransactions;
}