package com.ssafy.jdbc.melodiket.concert.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.concert.service.dto.SeatingConcertCreateReq;
import com.ssafy.jdbc.melodiket.concert.service.dto.StandingConcertCreateReq;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

import static com.ssafy.jdbc.melodiket.concert.service.contract.CommonConcertContract.extractCreatedConcertIdFrom;

public class ManagerContract extends Contract {
    public ManagerContract(BlockchainConfig blockchainConfig, org.web3j.crypto.Credentials credentials) {
        super(blockchainConfig.getMelodiketContractAddress(), blockchainConfig.web3j(), credentials, BigInteger.valueOf(blockchainConfig.getMinGasPrice()), BigInteger.valueOf(blockchainConfig.getMaxGasPrice()));
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
        Uint256 concertId = extractCreatedConcertIdFrom(result);
        if (concertId != null) {
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
        Uint256 concertId = extractCreatedConcertIdFrom(result);
        if (concertId != null) {
            return concertId.getValue().longValue();
        }

        throw new RuntimeException("Failed to create a concert.");
    }
}
