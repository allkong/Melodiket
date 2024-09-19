package com.ssafy.jdbc.melodiket.concert.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.blockchain.service.contract.MappingQueryResult;
import com.ssafy.jdbc.melodiket.concert.service.dto.SeatingConcertCreateReq;
import com.ssafy.jdbc.melodiket.concert.service.dto.StandingConcertCreateReq;
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
import org.web3j.protocol.core.RemoteFunctionCall;
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
import java.util.stream.Collectors;

import static com.ssafy.jdbc.melodiket.blockchain.service.contract.BlockchainUtil.isZeroAddress;
import static com.ssafy.jdbc.melodiket.concert.service.contract.ConcertEvents.CONCERT_CREATED;

@Component
public class ConcertManagerContract extends Contract {
    private final BlockchainConfig blockchainConfig;

    public ConcertManagerContract(BlockchainConfig blockchainConfig, Web3j web3j, Credentials credentials) {
        super(blockchainConfig.getMelodiketContractAddress(), web3j, credentials, BigInteger.valueOf(0), BigInteger.valueOf(1000000000));
        this.blockchainConfig = blockchainConfig;
    }

    public long createStandingConcert(StandingConcertCreateReq req) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "createStandingConcert",
                Arrays.asList(
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getTicketPrice())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getVenueEarningsPerTicket())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getMusicianBaseEarningsPerTicket())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getTicketingStartAt())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getConcertStartAt())),
                        new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                                Arrays.stream(req.getMusicians()).map(org.web3j.abi.datatypes.Address::new).collect(Collectors.toList())
                        ),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getNumOfRestTickets())),
                        new org.web3j.abi.datatypes.Utf8String(req.getPosterCid())
                ),
                Collections.singletonList(new org.web3j.abi.TypeReference<Uint256>() {
                })
        ));

        TransactionReceipt result = functionCall.send();

        for (Log log : result.getLogs()) {
            EventValues eventValues = Contract.staticExtractEventParameters(CONCERT_CREATED, log);
            List<Type> decodedValues = eventValues.getNonIndexedValues();
            Uint256 concertId = (Uint256) decodedValues.get(0);
            return concertId.getValue().longValue();
        }

        throw new RuntimeException("Failed to create a concert.");
    }

    public long createSeatingConcert(SeatingConcertCreateReq req) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "createSeatingConcert",
                Arrays.asList(
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getTicketPrice())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getVenueEarningsPerTicket())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getMusicianBaseEarningsPerTicket())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getTicketingStartAt())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getConcertStartAt())),
                        new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                                Arrays.stream(req.getMusicians()).map(org.web3j.abi.datatypes.Address::new).collect(Collectors.toList())
                        ),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getRowSize())),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(req.getColSize())),
                        new org.web3j.abi.datatypes.Utf8String(req.getPosterCid())
                ),
                Collections.singletonList(new org.web3j.abi.TypeReference<Uint256>() {
                })
        ));

        TransactionReceipt result = functionCall.send();
        for (Log log : result.getLogs()) {
            EventValues eventValues = Contract.staticExtractEventParameters(CONCERT_CREATED, log);
            List<Type> decodedValues = eventValues.getNonIndexedValues();
            Uint256 concertId = (Uint256) decodedValues.get(0);
            return concertId.getValue().longValue();
        }

        throw new RuntimeException("Failed to create a concert.");
    }

    private MappingQueryResult getConcertInfo(int concertId, String functionName, List<TypeReference<?>> outputParameters) {
        Function function = new Function(
                functionName,
                Collections.singletonList(new Uint256(concertId)),
                outputParameters
        );

        String encodedFunction = FunctionEncoder.encode(function);
        CompletableFuture<EthCall> ethCallFuture = web3j.ethCall(
                Transaction.createEthCallTransaction(blockchainConfig.getSystemWalletAddress(), blockchainConfig.getMelodiketContractAddress(), encodedFunction),
                DefaultBlockParameterName.LATEST
        ).sendAsync();

        return new MappingQueryResult(ethCallFuture, function.getOutputParameters());
    }

    public Concert getConcertById(int concertId) {
        List<TypeReference<?>> outputParameters = Arrays.asList(
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

        MappingQueryResult queryResult = getConcertInfo(concertId, "getTotalConcertInfo", outputParameters);
        String response = queryResult.ethCallFuture().join().getValue();
        List<Type> decoded = FunctionReturnDecoder.decode(response, queryResult.outputType());

        Address managerAddress = (Address) decoded.get(2);
        if (isZeroAddress(managerAddress)) {
            throw new RuntimeException("Concert not found.");
        }

        return new Concert(decoded);
    }
}