package com.ssafy.jdbc.melodiket.concert.service.dto;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
public class ConcertCreateReq {
    private UUID concertUuid;
    private long ticketPrice;
    private long venueEarningsPerTicket;
    private long musicianBaseEarningsPerTicket;
    private long ticketingStartAt;
    private long concertStartAt;
    private String[] musicians;
    private String posterCid;

    public ConcertCreateReq(ConcertEntity entity, List<String> musicianWalletAddresses) {
        this.concertUuid = entity.getUuid();
        this.ticketPrice = entity.getTicketPrice();
        this.venueEarningsPerTicket = entity.getOwnerStake();
        this.musicianBaseEarningsPerTicket = entity.getMusicianStake();
        this.ticketingStartAt = entity.getTicketingAt().toEpochSecond(ZoneOffset.UTC);
        this.concertStartAt = entity.getStartAt().toEpochSecond(ZoneOffset.UTC);
        this.musicians = musicianWalletAddresses.toArray(new String[0]);
        this.posterCid = entity.getPosterCid();
    }
}
