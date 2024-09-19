package com.ssafy.jdbc.melodiket.token.service.contract;

import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.tx.Contract;

import java.math.BigInteger;
import java.util.Collections;

public class MelodyTokenContract extends Contract {
    public MelodyTokenContract(String contractAddress, Web3j web3j, Credentials credentials) {
        super(contractAddress, web3j, credentials, BigInteger.valueOf(0), BigInteger.valueOf(0));
    }

    public RemoteCall<Uint256> balanceOf(String owner) {
        return executeRemoteCallSingleValueReturn(new org.web3j.abi.datatypes.Function(
                "balanceOf",
                Collections.singletonList(new Address(owner)),
                Collections.singletonList(new org.web3j.abi.TypeReference<Uint256>() {
                })));
    }
}
