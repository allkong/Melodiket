package com.ssafy.jdbc.melodiket.blockchain.service.contract;

import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Type;
import org.web3j.protocol.core.methods.response.EthCall;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public record MappingQueryResult(
        CompletableFuture<EthCall> ethCallFuture,
        List<TypeReference<Type>> outputType
) {
}
