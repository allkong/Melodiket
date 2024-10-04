package com.ssafy.jdbc.melodiket.account.entity;

import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "account_certification")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountCertificationEntity extends BaseEntity {
    @Column(nullable = false)
    private String ownerName;

    @Column(unique = true, nullable = false)
    private String number;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String secret;

    @Column(nullable = false)
    private Date expiresAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUserEntity appUserEntity;
}
