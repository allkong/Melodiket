package com.ssafy.jdbc.melodiket.concert.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import org.web3j.abi.EventValues;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static com.ssafy.jdbc.melodiket.concert.service.contract.CommonConcertContract.extractEvent;
import static com.ssafy.jdbc.melodiket.concert.service.contract.ConcertEvents.TICKET_PURCHASED;

public class AudienceContract extends Contract {
    private final CommonConcertContract commonConcertContract;

    public AudienceContract(BlockchainConfig blockchainConfig, org.web3j.crypto.Credentials credentials) {
        super(blockchainConfig.getMelodiketContractAddress(), blockchainConfig.web3j(), credentials, BigInteger.valueOf(blockchainConfig.getGasPrice()), BigInteger.valueOf(blockchainConfig.getGasLimit()));
        this.commonConcertContract = new CommonConcertContract(blockchainConfig, credentials);
    }

    public String purchaseStandingTicket(UUID ticketUuid, UUID concertUuid, String favoriteMusicianAddress) throws Exception {
        if (!commonConcertContract.isStandingConcert(concertUuid)) {
            throw new IllegalArgumentException("This concert is a seating concert.");
        }
        return purchaseTicket(ticketUuid, concertUuid, favoriteMusicianAddress, 0, 0);
    }

    public String purchaseSeatingTicket(UUID ticketUuid, UUID concertUuid, String favoriteMusicianAddress, long seatRow, long seatCol) throws Exception {
        if (commonConcertContract.isStandingConcert(concertUuid)) {
            throw new IllegalArgumentException("This concert is a standing concert.");
        }
        return purchaseTicket(ticketUuid, concertUuid, favoriteMusicianAddress, seatRow - 1, seatCol - 1);

    }

    private String purchaseTicket(UUID ticketUuid, UUID concertUuid, String favoriteMusicianAddress, long seatRow, long seatCol) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "purchaseTicket",
                List.of(
                        new org.web3j.abi.datatypes.Utf8String(ticketUuid.toString()),
                        new org.web3j.abi.datatypes.Utf8String(concertUuid.toString()),
                        new org.web3j.abi.datatypes.Address(favoriteMusicianAddress),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(seatRow)),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(seatCol))
                ),
                Collections.emptyList()
        ));

        TransactionReceipt receipt = functionCall.send();
        EventValues eventValues = extractEvent(receipt, TICKET_PURCHASED);
        return eventValues.getNonIndexedValues().get(2).getValue().toString();
    }

    public void refundTicket(UUID ticketUuid, UUID concertUuid) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "refundTicket",
                List.of(
                        new org.web3j.abi.datatypes.Utf8String(ticketUuid.toString()),
                        new org.web3j.abi.datatypes.Utf8String(concertUuid.toString())
                ),
                Collections.emptyList()
        ));

        TransactionReceipt receipt = functionCall.send();
    }
}
