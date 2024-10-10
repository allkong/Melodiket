package com.ssafy.jdbc.melodiket.concert.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import lombok.extern.slf4j.Slf4j;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Slf4j
public class MusicianContract extends Contract {
    public MusicianContract(BlockchainConfig blockchainConfig, Credentials credentials) {
        super(blockchainConfig.getMelodiketContractAddress(), blockchainConfig.web3j(), credentials, BigInteger.valueOf(blockchainConfig.getGasPrice()), BigInteger.valueOf(blockchainConfig.getGasLimit()));
    }

    public boolean agreeToConcert(UUID concertUuid) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new Function(
                "agreeToConcert",
                Collections.singletonList(new Utf8String(concertUuid.toString())),
                Collections.emptyList()
        ));

        try {
            TransactionReceipt receipt = functionCall.send();
            return receipt.isStatusOK();
        } catch (TransactionException e) {
            log.error("Failed to agree to concert. Reason: {}", e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    public boolean denyToConcert(UUID concertUuid) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new Function(
                "denyToConcert",
                Collections.singletonList(new Utf8String(concertUuid.toString())),
                Collections.emptyList()
        ));

        try {
            TransactionReceipt receipt = functionCall.send();
            return receipt.isStatusOK();
        } catch (TransactionException e) {
            log.error("Failed to deny to concert. Reason: {}", e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}
