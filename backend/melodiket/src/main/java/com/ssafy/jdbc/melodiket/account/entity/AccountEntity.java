package com.ssafy.jdbc.melodiket.account.entity;

import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bank_account")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountEntity extends ExposableEntity {
    @Column(nullable = false)
    private String ownerName;

    @Column(unique = true, nullable = false)
    private String number;

    @Column(nullable = false)
    private String bankName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUserEntity appUserEntity;

}
