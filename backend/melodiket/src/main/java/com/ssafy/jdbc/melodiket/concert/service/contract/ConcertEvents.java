package com.ssafy.jdbc.melodiket.concert.service.contract;

import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;

import java.util.Arrays;
import java.util.List;

public abstract class ConcertEvents {
    public static final Event CONCERT_CREATED = new Event(
            "ConcertCreated",
            Arrays.asList(
                    new TypeReference<Utf8String>() {
                    }, // concertUuid
                    new TypeReference<Address>() {
                    } // manager address
            )
    );

    public static final Event ALL_MUSICIAN_AGREED = new Event(
            "AllMusicianAgreed",
            List.of(
                    new TypeReference<Utf8String>() {
                    } // concertUuid
            )
    );

    public static final Event MUSICIAN_AGREED = new Event(
            "MusicianAgreed",
            List.of(
                    new TypeReference<Utf8String>() {
                    }, // concertUuid
                    new TypeReference<Address>() {
                    } // musician address
            )
    );

    public static final Event MUSICIAN_DENIED = new Event(
            "MusicianDenied",
            List.of(
                    new TypeReference<Utf8String>() {
                    }, // concertUuid
                    new TypeReference<Address>() {
                    } // musician address
            )
    );

    public static final Event CONCERT_CANCELED = new Event(
            "ConcertCanceled",
            List.of(
                    new TypeReference<Utf8String>() {
                    } // concertUuid
            )
    );

    public static final Event TICKET_PURCHASED = new Event(
            "TicketPurchased",
            List.of(
                    new TypeReference<Utf8String>() {
                    }, // concertUuid
                    new TypeReference<Address>() {
                    }, // owner address
                    new TypeReference<Utf8String>() {
                    } // ticket uuid
            )
    );
}
