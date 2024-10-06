package com.ssafy.jdbc.melodiket.wallet.entity;

import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "wallet_info")
public class WalletInfoEntity extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUserEntity user;

    @Column(unique = true, nullable = false)
    private String walletAddress;

    @Column(unique = true, nullable = false)
    private String privateKey;

    @Column(unique = true, nullable = false)
    private String publicKey;
}
