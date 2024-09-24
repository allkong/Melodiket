package com.ssafy.jdbc.melodiket.concert.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import org.web3j.abi.EventValues;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;

import static com.ssafy.jdbc.melodiket.concert.service.contract.CommonConcertContract.extractEvent;
import static com.ssafy.jdbc.melodiket.concert.service.contract.ConcertEvents.TICKET_PURCHASED;

public class AudienceContract extends Contract {
    private final CommonConcertContract commonConcertContract;

    public AudienceContract(BlockchainConfig blockchainConfig, org.web3j.crypto.Credentials credentials) {
        super(blockchainConfig.getMelodiketContractAddress(), blockchainConfig.web3j(), credentials, BigInteger.valueOf(blockchainConfig.getGasPrice()), BigInteger.valueOf(blockchainConfig.getGasLimit()));
        this.commonConcertContract = new CommonConcertContract(blockchainConfig, credentials);
    }

    public long purchaseStandingTicket(long concertId, String favoriteMusicianAddress) throws Exception {
        if (!commonConcertContract.isStandingConcert(concertId)) {
            throw new IllegalArgumentException("This concert is a seating concert.");
        }
        return purchaseTicket(concertId, favoriteMusicianAddress, 0, 0);
    }

    public long purchaseSeatingTicket(long concertId, String favoriteMusicianAddress, int seatRow, int seatCol) throws Exception {
        if (commonConcertContract.isStandingConcert(concertId)) {
            throw new IllegalArgumentException("This concert is a standing concert.");
        }
        return purchaseTicket(concertId, favoriteMusicianAddress, seatRow - 1, seatCol - 1);

    }

    private long purchaseTicket(long concertId, String favoriteMusicianAddress, int seatRow, int seatCol) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "purchaseTicket",
                List.of(
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(concertId)),
                        new org.web3j.abi.datatypes.Address(favoriteMusicianAddress),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(seatRow)),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(seatCol))
                ),
                Collections.emptyList()
        ));

        TransactionReceipt receipt = functionCall.send();
        EventValues eventValues = extractEvent(receipt, TICKET_PURCHASED);

        return ((BigInteger) eventValues.getNonIndexedValues().get(2).getValue()).longValue();
    }

    public void refundTicket(long concertId, long ticketId) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new org.web3j.abi.datatypes.Function(
                "refundTicket",
                List.of(
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(concertId)),
                        new org.web3j.abi.datatypes.Uint(BigInteger.valueOf(ticketId))
                ),
                Collections.emptyList()
        ));

        TransactionReceipt receipt = functionCall.send();
    }
}
