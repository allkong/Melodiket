package com.ssafy.jdbc.melodiket.concert.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@Setter
@NoArgsConstructor
@SuperBuilder
@Getter
public class StandingConcertCreateReq extends ConcertCreateReq {
    private int numOfRestTickets;

    public StandingConcertCreateReq(int ticketPrice, int venueEarningsPerTicket, int musicianBaseEarningsPerTicket, long ticketingStartAt, long concertStartAt, String[] musicians, String posterCid) {
        super(ticketPrice, venueEarningsPerTicket, musicianBaseEarningsPerTicket, ticketingStartAt, concertStartAt, musicians, posterCid);
        numOfRestTickets = 0;
    }

    public StandingConcertCreateReq(int ticketPrice, int venueEarningsPerTicket, int musicianBaseEarningsPerTicket, long ticketingStartAt, long concertStartAt, String[] musicians, String posterCid, int numOfRestTickets) {
        this(ticketPrice, venueEarningsPerTicket, musicianBaseEarningsPerTicket, ticketingStartAt, concertStartAt, musicians, posterCid);
        this.numOfRestTickets = numOfRestTickets;
    }
}
