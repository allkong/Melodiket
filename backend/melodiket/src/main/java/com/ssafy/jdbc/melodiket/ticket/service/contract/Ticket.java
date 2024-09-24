package com.ssafy.jdbc.melodiket.ticket.service.contract;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.ToString;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;

import java.util.List;

@ToString
@AllArgsConstructor
@Builder
public class Ticket {
    long id;
    String ownerAddress;
    long concertId;
    Status status;
    String favoriteMusicianAddress;
    boolean isStanding;
    long seatRow;
    long seatColumn;

    public Ticket(List<Type> decoded) {
        this.id = ((org.web3j.abi.datatypes.generated.Uint256) decoded.get(0)).getValue().longValue();
        this.ownerAddress = ((org.web3j.abi.datatypes.Address) decoded.get(1)).getValue();
        this.concertId = ((org.web3j.abi.datatypes.generated.Uint256) decoded.get(2)).getValue().longValue();
        this.status = Status.valueOf(((Utf8String) decoded.get(3)).getValue());
        this.favoriteMusicianAddress = ((org.web3j.abi.datatypes.Address) decoded.get(4)).getValue();
        this.isStanding = ((org.web3j.abi.datatypes.Bool) decoded.get(5)).getValue();
        this.seatRow = this.isStanding ? -1 : 1 + ((org.web3j.abi.datatypes.generated.Uint256) decoded.get(6)).getValue().longValue();
        this.seatColumn = this.isStanding ? -1 : 1 + ((org.web3j.abi.datatypes.generated.Uint256) decoded.get(7)).getValue().longValue();
    }

    public enum Status {
        UNUSED, USED, REFUNDED
    }
}
