package com.ssafy.jdbc.melodiket.concert.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.concert.service.dto.SeatingConcertCreateReq;
import com.ssafy.jdbc.melodiket.concert.service.dto.StandingConcertCreateReq;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ssafy.jdbc.melodiket.concert.service.contract.CommonConcertContract.extractCreatedConcertUuidFrom;

public class ManagerContract extends Contract {
    private final BlockchainConfig blockchainConfig;

    public ManagerContract(BlockchainConfig blockchainConfig, org.web3j.crypto.Credentials credentials) {
        super(blockchainConfig.getMelodiketContractAddress(), blockchainConfig.web3j(), credentials, BigInteger.valueOf(blockchainConfig.getGasPrice()), BigInteger.valueOf(blockchainConfig.getGasLimit()));
        this.blockchainConfig = blockchainConfig;
    }

    public String createStandingConcert(StandingConcertCreateReq req) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "createStandingConcert",
                Arrays.asList(
                        new org.web3j.abi.datatypes.Utf8String(req.getConcertUuid().toString()),
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
                Collections.singletonList(new org.web3j.abi.TypeReference<Utf8String>() {
                })
        ));

        TransactionReceipt result = functionCall.send();
        Utf8String concertUuid = extractCreatedConcertUuidFrom(result);
        if (concertUuid != null) {
            return concertUuid.getValue().toString();
        }

        throw new RuntimeException("Failed to create a concert.");
    }

    public String createSeatingConcert(SeatingConcertCreateReq req) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "createSeatingConcert",
                Arrays.asList(
                        new org.web3j.abi.datatypes.Utf8String(req.getConcertUuid().toString()),
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
        Utf8String concertId = extractCreatedConcertUuidFrom(result);
        if (concertId != null) {
            return concertId.getValue().toString();
        }

        throw new RuntimeException("Failed to create a concert.");
    }

    public boolean closeConcert(UUID concertUuid) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "closeConcert",
                Collections.singletonList(new org.web3j.abi.datatypes.Utf8String(concertUuid.toString())),
                Collections.emptyList()
        ));

        TransactionReceipt result = functionCall.send();
        return result.isStatusOK();
    }

    public void useTicket(UUID concertUuid, UUID ticketUuid) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "useTicket",
                List.of(
                        new org.web3j.abi.datatypes.Utf8String(concertUuid.toString()),
                        new org.web3j.abi.datatypes.Utf8String(ticketUuid.toString())
                ),
                Collections.emptyList()
        ));

        TransactionReceipt receipt = functionCall.send();
    }

    public void cancelConcert(UUID concertUuid) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "cancelConcert",
                Collections.singletonList(new org.web3j.abi.datatypes.Utf8String(concertUuid.toString())),
                Collections.emptyList()
        ));

        TransactionReceipt receipt = functionCall.send();
    }
}
