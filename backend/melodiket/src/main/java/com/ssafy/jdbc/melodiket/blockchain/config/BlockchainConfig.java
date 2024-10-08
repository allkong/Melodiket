package com.ssafy.jdbc.melodiket.blockchain.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;

@Getter
@Configuration
public class BlockchainConfig {
    private final String systemPrivateKey;
    private final String systemWalletAddress;
    private final String rpcUrl;
    private final String melodiketContractAddress;
    private final String melodyTokenContractAddress;
    private final String ticketContractAddress;
    private final String photoCardContractAddress;
    private final long gasPrice;
    private final long gasLimit;

    public BlockchainConfig(
            @Value("${blockchain.system-private-key}") String systemPrivateKey,
            @Value("${blockchain.system-wallet-address}") String systemWalletAddress,
            @Value("${blockchain.rpc-url}") String rpcUrl,
            @Value("${blockchain.contract-addresses.melodiket}") String melodiketContractAddress,
            @Value("${blockchain.contract-addresses.melody-token}") String melodyTokenContractAddress,
            @Value("${blockchain.contract-addresses.ticket}") String ticketContractAddress,
            @Value("${blockchain.contract-addresses.photo-card}") String photoCardContractAddress,
            @Value("${blockchain.gas-price}") long gasPrice,
            @Value("${blockchain.gas-limit}") long gasLimit
    ) {
        this.systemPrivateKey = systemPrivateKey;
        this.systemWalletAddress = systemWalletAddress;
        this.rpcUrl = rpcUrl;
        this.melodiketContractAddress = melodiketContractAddress;
        this.melodyTokenContractAddress = melodyTokenContractAddress;
        this.ticketContractAddress = ticketContractAddress;
        this.photoCardContractAddress = photoCardContractAddress;
        this.gasPrice = gasPrice;
        this.gasLimit = gasLimit;
    }

    @Bean
    public Web3j web3j() {
        return Web3j.build(new org.web3j.protocol.http.HttpService(rpcUrl));
    }

    @Bean
    public Credentials credentials() {
        return Credentials.create(systemPrivateKey);
    }
}
