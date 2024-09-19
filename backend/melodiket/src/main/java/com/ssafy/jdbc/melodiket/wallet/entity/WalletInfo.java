package com.ssafy.jdbc.melodiket.wallet.entity;

import com.ssafy.jdbc.melodiket.user.entity.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wallet_info")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WalletInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    @Column(unique = true, nullable = false)
    private String walletAddress;

    @Column(unique = true, nullable = false)
    private String privateKey;

    @Column(unique = true, nullable = false)
    private String publicKey;

}
