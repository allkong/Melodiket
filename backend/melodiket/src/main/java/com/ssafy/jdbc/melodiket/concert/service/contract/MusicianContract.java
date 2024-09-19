package com.ssafy.jdbc.melodiket.concert.service.contract;

import lombok.extern.slf4j.Slf4j;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;

@Slf4j
public class MusicianContract extends Contract {
    public MusicianContract(String melodiketContractAddress, Web3j web3j, Credentials credentials) {
        super(melodiketContractAddress, web3j, credentials, BigInteger.valueOf(875000000), BigInteger.valueOf(30000000));
    }

    public boolean agreeToConcert(int concertId) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new Function(
                "agreeToConcert",
                List.of(new Uint256(BigInteger.valueOf(concertId))),
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

    public boolean denyToConcert(int concertId) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new Function(
                "denyToConcert",
                List.of(new Uint256(BigInteger.valueOf(concertId))),
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
