package com.ssafy.jdbc.melodiket.concert.service.dto;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Setter
@NoArgsConstructor
@SuperBuilder
@Getter
public class StandingConcertCreateReq extends ConcertCreateReq {
    private long numOfRestTickets;

    public StandingConcertCreateReq(UUID concertUuid, int ticketPrice, int venueEarningsPerTicket, int musicianBaseEarningsPerTicket, long ticketingStartAt, long concertStartAt, String[] musicians, String posterCid) {
        super(concertUuid, ticketPrice, venueEarningsPerTicket, musicianBaseEarningsPerTicket, ticketingStartAt, concertStartAt, musicians, posterCid);
        numOfRestTickets = 0;
    }

    public StandingConcertCreateReq(UUID concertUuid, int ticketPrice, int venueEarningsPerTicket, int musicianBaseEarningsPerTicket, long ticketingStartAt, long concertStartAt, String[] musicians, String posterCid, int numOfRestTickets) {
        this(concertUuid, ticketPrice, venueEarningsPerTicket, musicianBaseEarningsPerTicket, ticketingStartAt, concertStartAt, musicians, posterCid);
        this.numOfRestTickets = numOfRestTickets;
    }

    public StandingConcertCreateReq(ConcertEntity entity, List<String> musicianWalletAddresses) {
        super(entity, musicianWalletAddresses);
        this.numOfRestTickets = entity.getAvailableTickets();
    }
}
