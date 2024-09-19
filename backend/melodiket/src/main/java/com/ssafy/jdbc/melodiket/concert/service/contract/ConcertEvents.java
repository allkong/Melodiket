package com.ssafy.jdbc.melodiket.concert.service.contract;

import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.generated.Uint256;

import java.util.Arrays;

public abstract class ConcertEvents {
    public static final Event CONCERT_CREATED = new Event(
            "ConcertCreated",
            Arrays.asList(
                    new TypeReference<Uint256>() {
                    },
                    new TypeReference<Address>() {
                    }
            )
    );
}
