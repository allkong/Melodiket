package com.ssafy.jdbc.melodiket.concert.service.contract;

import lombok.ToString;
import org.web3j.abi.datatypes.*;
import org.web3j.abi.datatypes.generated.Uint256;

import java.util.List;

@ToString
public class Concert {
    public long id;
    public Status status;
    public String manager;
    public String posterCid;
    public long concertStartAt;
    public List<String> pendingMusicianAddresses;
    public List<String> agreedMusicianAddresses;
    public List<String> deniedMusicianAddresses;
    public List<String> favoriteMusicianAddresses;
    public List<Long> favoriteVotes;
    public long ticketPrice;
    public long venueEarningsPerTicket;
    public long musicianBaseEarningsPerTicket;
    public long favoriteBonus;
    public long refundedTokenAmount;
    public long transferAvailableAfter;
    public List<Long> tickets;
    public long numOfRestTickets;
    public long ticketingStartAt;
    public List<List<Boolean>> isReserved;
    public boolean isStanding;
    public int seatRowSize;
    public int seatColSize;

    public Concert(List<Type> decoded) {
        this(
                (Uint256) decoded.get(0),
                (Utf8String) decoded.get(1),
                (Address) decoded.get(2),
                (Utf8String) decoded.get(3),
                (Uint256) decoded.get(4),
                (DynamicArray<Address>) decoded.get(5),
                (DynamicArray<Address>) decoded.get(6),
                (DynamicArray<Address>) decoded.get(7),
                (DynamicArray<Address>) decoded.get(8),
                (DynamicArray<Uint256>) decoded.get(9),
                (Uint256) decoded.get(10),
                (Uint256) decoded.get(11),
                (Uint256) decoded.get(12),
                (Uint256) decoded.get(13),
                (Uint256) decoded.get(14),
                (Uint256) decoded.get(15),
                (DynamicArray<Uint256>) decoded.get(16),
                (Uint256) decoded.get(17),
                (Uint256) decoded.get(18),
                (DynamicArray<DynamicArray<Bool>>) decoded.get(19),
                (Bool) decoded.get(20),
                (DynamicArray<Uint256>) decoded.get(21)
        );
    }

    public Concert(Uint256 id, Utf8String status, Address manager, Utf8String posterCid, Uint256 concertStartAt,
                   DynamicArray<Address> pendingMusicianAddresses, DynamicArray<Address> agreedMusicianAddresses,
                   DynamicArray<Address> deniedMusicianAddresses, DynamicArray<Address> favoriteMusicianAddresses,
                   DynamicArray<Uint256> favoriteVotes, Uint256 ticketPrice, Uint256 venueEarningsPerTicket,
                   Uint256 musicianBaseEarningsPerTicket, Uint256 favoriteBonus, Uint256 refundedTokenAmount,
                   Uint256 transferAvailableAfter, DynamicArray<Uint256> tickets, Uint256 numOfRestTickets,
                   Uint256 ticketingStartAt, DynamicArray<DynamicArray<Bool>> isReserved, Bool isStanding,
                   DynamicArray<Uint256> seatSizes) {
        this.id = id.getValue().longValue();
        this.status = Status.valueOf(status.getValue());
        this.manager = manager.getValue();
        this.posterCid = posterCid.getValue();
        this.concertStartAt = concertStartAt.getValue().longValue();
        this.pendingMusicianAddresses = pendingMusicianAddresses.getValue().stream().map(Address::getValue).toList();
        this.agreedMusicianAddresses = agreedMusicianAddresses.getValue().stream().map(Address::getValue).toList();
        this.deniedMusicianAddresses = deniedMusicianAddresses.getValue().stream().map(Address::getValue).toList();
        this.favoriteMusicianAddresses = favoriteMusicianAddresses.getValue().stream().map(Address::getValue).toList();
        this.favoriteVotes = favoriteVotes.getValue().stream().map(Uint256::getValue).map(Number::longValue).toList();
        this.ticketPrice = ticketPrice.getValue().longValue();
        this.venueEarningsPerTicket = venueEarningsPerTicket.getValue().longValue();
        this.musicianBaseEarningsPerTicket = musicianBaseEarningsPerTicket.getValue().longValue();
        this.favoriteBonus = favoriteBonus.getValue().longValue();
        this.refundedTokenAmount = refundedTokenAmount.getValue().longValue();
        this.transferAvailableAfter = transferAvailableAfter.getValue().longValue();
        this.tickets = tickets.getValue().stream().map(Uint256::getValue).map(Number::longValue).toList();
        this.numOfRestTickets = numOfRestTickets.getValue().longValue();
        this.ticketingStartAt = ticketingStartAt.getValue().longValue();
        this.isStanding = isStanding.getValue();

        if (!this.isStanding) {
            this.isReserved = isReserved.getValue().stream().map(row -> row.getValue().stream().map(bool -> bool.getValue()).toList()).toList();
            this.seatRowSize = seatSizes.getValue().get(0).getValue().intValue();
            this.seatColSize = seatSizes.getValue().get(1).getValue().intValue();
        }
    }

    enum Status {
        PREPARING, // 뮤지션 초대가 발송된 상황
        ACTIVE, // 모든 뮤지션이 초대를 수락한 상황
        CANCELED, // 뮤지션 중 하나라도 초대를 거절한 상황
        TRANSFERRED, // 토큰이 전송된 상황
    }
}