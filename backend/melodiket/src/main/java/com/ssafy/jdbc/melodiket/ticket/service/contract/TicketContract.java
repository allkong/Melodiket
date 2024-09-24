package com.ssafy.jdbc.melodiket.ticket.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.*;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class TicketContract extends Contract {
    private static final List<TypeReference<?>> TICKET_OUTPUT_PARAMS = Arrays.asList(
            new TypeReference<Uint256>() {
            }, // id
            new TypeReference<Address>() {
            }, // owner
            new TypeReference<Uint256>() {
            }, // concertId
            new TypeReference<Utf8String>() {
            }, // status
            new TypeReference<Address>() {
            }, // favoriteMusicianAddress
            new TypeReference<Bool>() {
            }, // isStanding
            new TypeReference<Uint256>() {
            }, // seatRow
            new TypeReference<Uint256>() {
            } // seatColumn
    );
    private final BlockchainConfig blockchainConfig;
    private final Credentials credentials;

    public TicketContract(BlockchainConfig blockchainConfig, org.web3j.crypto.Credentials credentials) {
        super(blockchainConfig.getTicketContractAddress(), blockchainConfig.web3j(), credentials, BigInteger.valueOf(blockchainConfig.getGasPrice()), BigInteger.valueOf(blockchainConfig.getGasLimit()));
        this.blockchainConfig = blockchainConfig;
        this.credentials = credentials;
    }

    public Ticket getTicketWithId(long ticketId) {
        Function function = new Function(
                "getTicketInfoArrayWithId",
                Collections.singletonList(new Uint256(BigInteger.valueOf(ticketId))),
                TICKET_OUTPUT_PARAMS
        );

        String encodedFunction = FunctionEncoder.encode(function);
        CompletableFuture<EthCall> ethCallFuture = blockchainConfig.web3j().ethCall(
                Transaction.createEthCallTransaction(credentials.getAddress(), contractAddress, encodedFunction),
                DefaultBlockParameterName.LATEST
        ).sendAsync();

        String response = ethCallFuture.join().getValue();
        List<Type> responseValues = FunctionReturnDecoder.decode(response, function.getOutputParameters());
        return new Ticket(responseValues);
    }
}
