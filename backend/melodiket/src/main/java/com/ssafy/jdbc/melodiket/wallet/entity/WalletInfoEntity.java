package com.ssafy.jdbc.melodiket.wallet.entity;

import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wallet_info")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WalletInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
