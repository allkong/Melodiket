package com.ssafy.jdbc.melodiket.photocard.service.contract;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class PhotoCardContract extends Contract {
    private static final List<TypeReference<?>> PHOTO_CARD_OUTPUT_PARAMS = Arrays.asList(
            new TypeReference<Uint256>() {
            }, // id
            new TypeReference<Utf8String>() {
            }, // uuid
            new TypeReference<Utf8String>() {
            }, // ticketUuid
            new TypeReference<Address>() {
            }, // ownerAddress
            new TypeReference<Utf8String>() {
            } // imageCid
    );

    private final BlockchainConfig blockchainConfig;
    private final Credentials credentials;

    public PhotoCardContract(BlockchainConfig blockchainConfig, Credentials credentials) {
        super(blockchainConfig.getPhotoCardContractAddress(), blockchainConfig.web3j(), credentials, BigInteger.valueOf(blockchainConfig.getGasPrice()), BigInteger.valueOf(blockchainConfig.getGasLimit()));
        this.blockchainConfig = blockchainConfig;
        this.credentials = credentials;
    }

    public void createPhotoCard(String photoCardUuid, String ticketUuid, String ownerAddress, String imageCid) throws Exception {
        RemoteFunctionCall<TransactionReceipt> functionCall = executeRemoteCallTransaction(new Function(
                "mintPhotoCard",
                List.of(
                        new Utf8String(photoCardUuid),
                        new Utf8String(ticketUuid),
                        new Address(ownerAddress),
                        new Utf8String(imageCid)
                ),
                Collections.emptyList()
        ));

        functionCall.send();
    }

    public PhotoCard getPhotoCardWithUuid(String photoCardUuid) {
        Function function = new Function(
                "getPhotoCardInfoArrayWithUuid",
                Collections.singletonList(new Utf8String(photoCardUuid)),
                PHOTO_CARD_OUTPUT_PARAMS
        );

        String encodedFunction = FunctionEncoder.encode(function);
        CompletableFuture<EthCall> ethCallFuture = blockchainConfig.web3j().ethCall(
                Transaction.createEthCallTransaction(credentials.getAddress(), contractAddress, encodedFunction),
                DefaultBlockParameterName.LATEST
        ).sendAsync();

        String response = ethCallFuture.join().getValue();
        List<Type> responseValues = FunctionReturnDecoder.decode(response, function.getOutputParameters());
        return new PhotoCard(responseValues);
    }
}
