package com.ssafy.a310.bank.user.repository;

import com.ssafy.a310.bank.account.repository.BankAccountEntity;
import com.ssafy.a310.bank.common.repository.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "app_user", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name", "yymmdd"})
})
public class UserEntity extends BaseEntity {
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "yymmdd", nullable = false)
    private String yymmdd;

    @OneToMany(mappedBy = "user")
    private List<BankAccountEntity> bankAccount;
}
