package com.ssafy.jdbc.melodiket.concert.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import org.springframework.stereotype.Component;
import org.web3j.abi.EventValues;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.*;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import static com.ssafy.jdbc.melodiket.blockchain.service.contract.BlockchainUtil.isZeroAddress;
import static com.ssafy.jdbc.melodiket.concert.service.contract.ConcertEvents.CONCERT_CREATED;

@Component
public class CommonConcertContract extends Contract {
    private static final List<TypeReference<?>> CONCERT_OUTPUT_PARAMS = Arrays.asList(
            new TypeReference<Uint256>() {
            },
            new TypeReference<Utf8String>() {
            },
            new TypeReference<Address>() {
            },
            new TypeReference<Utf8String>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<DynamicArray<Address>>() {
            },
            new TypeReference<DynamicArray<Address>>() {
            },
            new TypeReference<DynamicArray<Address>>() {
            },
            new TypeReference<DynamicArray<Address>>() {
            },
            new TypeReference<DynamicArray<Uint256>>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<DynamicArray<Uint256>>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<Uint256>() {
            },
            new TypeReference<DynamicArray<DynamicArray<Bool>>>() {
            },
            new TypeReference<Bool>() {
            },
            new TypeReference<DynamicArray<Uint256>>() {
            }
    );

    private final BlockchainConfig blockchainConfig;

    public CommonConcertContract(BlockchainConfig blockchainConfig, Web3j web3j, Credentials credentials) {
        super(blockchainConfig.getMelodiketContractAddress(), web3j, credentials, BigInteger.valueOf(0), BigInteger.valueOf(1000000000));
        this.blockchainConfig = blockchainConfig;
    }

    public static Uint256 extractCreatedConcertIdFrom(TransactionReceipt receipt) {
        EventValues eventValues = extractEvent(receipt, CONCERT_CREATED);
        if (eventValues != null) {
            List<Type> decodedValues = eventValues.getNonIndexedValues();
            return (Uint256) decodedValues.get(0);
        }
        return null;
    }

    public static EventValues extractEvent(TransactionReceipt receipt, Event event) {
        for (Log log : receipt.getLogs()) {
            EventValues eventValues = Contract.staticExtractEventParameters(event, log);
            if (eventValues != null) {
                return eventValues;
            }
        }
        return null;
    }

    public Concert getConcertById(int concertId) {
        Function function = new Function(
                "getTotalConcertInfo",
                Collections.singletonList(new Uint256(concertId)),
                CONCERT_OUTPUT_PARAMS
        );

        String encodedFunction = FunctionEncoder.encode(function);
        CompletableFuture<EthCall> ethCallFuture = web3j.ethCall(
                Transaction.createEthCallTransaction(blockchainConfig.getSystemWalletAddress(), blockchainConfig.getMelodiketContractAddress(), encodedFunction),
                DefaultBlockParameterName.LATEST
        ).sendAsync();

        String response = ethCallFuture.join().getValue();
        List<Type> decoded = FunctionReturnDecoder.decode(response, function.getOutputParameters());
        Address managerAddress = (Address) decoded.get(2);
        if (isZeroAddress(managerAddress)) {
            throw new RuntimeException("Concert not found.");
        }

        return new Concert(decoded);
    }
}