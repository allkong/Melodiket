package com.ssafy.jdbc.melodiket.wallet.service;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.token.service.contract.MelodyTokenContract;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.service.UserService;
import com.ssafy.jdbc.melodiket.wallet.entity.WalletInfoEntity;
import com.ssafy.jdbc.melodiket.wallet.repository.WalletRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.web3j.crypto.*;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.UUID;

// 환전 ( won -> MLDY , MLDY -> won )
// MLDY 조회
@Service
public class WalletService {
    private final BlockchainConfig blockchainConfig;
    private final Credentials systemCredentials;
    private final WalletRepository walletRepository;
    private final UserService userService;
    private final Random random;

    public WalletService(BlockchainConfig blockchainConfig, Credentials systemCredentials,
                         WalletRepository walletRepository, @Lazy UserService userService) throws NoSuchAlgorithmException {
        this.blockchainConfig = blockchainConfig;
        this.systemCredentials = systemCredentials;
        this.walletRepository = walletRepository;
        this.userService = userService;
        this.random = SecureRandom.getInstanceStrong();
    }

    public WalletResp getWalletOf(UUID uuid) {
        AppUserEntity user = userService.findUserByUuid(uuid);
        return getWalletOf(user);
    }

    public WalletResp getWalletOf(AppUserEntity user) {
        WalletInfoEntity wallet = walletRepository.findByUser(user)
                .orElseGet(() -> createNewWallet(user));

        MelodyTokenContract contract = new MelodyTokenContract(blockchainConfig, systemCredentials);
        long balance = contract.balanceOf(wallet.getWalletAddress());

        return new WalletResp(wallet.getWalletAddress(), balance);
    }

    public WalletInfoEntity createNewWallet(AppUserEntity user) {
        // Randomly create private key
        try {
            String seed = getRandomSeed();
            ECKeyPair ecKeyPair = Keys.createEcKeyPair();
            String privateKey = ecKeyPair.getPrivateKey().toString(16);
            String publicKey = ecKeyPair.getPublicKey().toString(16);
            WalletFile wallet = Wallet.createLight(seed, ecKeyPair);

            WalletInfoEntity entity = WalletInfoEntity.builder()
                    .user(user)
                    .walletAddress(wallet.getAddress())
                    .privateKey(privateKey)
                    .publicKey(publicKey)
                    .build();

            return walletRepository.save(entity);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String getRandomSeed() {
        return String.valueOf(random.nextInt(1000000000));
    }
}
