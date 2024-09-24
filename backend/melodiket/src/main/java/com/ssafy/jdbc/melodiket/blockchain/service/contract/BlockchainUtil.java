package com.ssafy.jdbc.melodiket.blockchain.service.contract;

import org.web3j.abi.datatypes.Address;

public abstract class BlockchainUtil {
    private static final Address ZERO_ADDRESS = new Address("0x0000000000000000000000000000000000000000");

    private BlockchainUtil() {
    }

    public static boolean isZeroAddress(Address address) {
        return address.equals(ZERO_ADDRESS);
    }

    public static boolean isZeroAddress(String addressString) {
        Address address = new Address(addressString);
        return isZeroAddress(address);
    }
}
