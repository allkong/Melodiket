package com.ssafy.jdbc.melodiket.token.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class MelodyTokenContract extends Contract {
    public MelodyTokenContract(BlockchainConfig blockchainConfig, Credentials credentials) {
        super(blockchainConfig.getMelodyTokenContractAddress(), blockchainConfig.web3j(), credentials, BigInteger.valueOf(blockchainConfig.getMinGasPrice()), BigInteger.valueOf(blockchainConfig.getMaxGasPrice()));
    }

    public long balanceOf(String owner) {
        RemoteCall<Uint256> remoteCall = executeRemoteCallSingleValueReturn(new org.web3j.abi.datatypes.Function(
                "balanceOf",
                Collections.singletonList(new Address(owner)),
                Collections.singletonList(new org.web3j.abi.TypeReference<Uint256>() {
                })));

        try {
            CompletableFuture<Uint256> future = remoteCall.sendAsync();
            return future.get().getValue().longValue();
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public boolean sendToken(String toAddress, long value) {
        RemoteCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "transfer",
                List.of(
                        new Address(toAddress),
                        new Uint256(BigInteger.valueOf(value))
                ),
                Collections.singletonList(new org.web3j.abi.TypeReference<Bool>() {
                })));

        try {
            TransactionReceipt result = functionCall.send();
            return result.isStatusOK();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
}
