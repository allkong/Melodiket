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
public class SeatingConcertCreateReq extends ConcertCreateReq {
    private int numOfRestTickets;
    private int rowSize;
    private int colSize;

    public SeatingConcertCreateReq(int ticketPrice, int venueEarningsPerTicket, int musicianBaseEarningsPerTicket, long ticketingStartAt, long concertStartAt, String[] musicians, String posterCid) {
        super(ticketPrice, venueEarningsPerTicket, musicianBaseEarningsPerTicket, ticketingStartAt, concertStartAt, musicians, posterCid);
    }

    public SeatingConcertCreateReq(int ticketPrice, int venueEarningsPerTicket, int musicianBaseEarningsPerTicket, long ticketingStartAt, long concertStartAt, String[] musicians, String posterCid, int numOfRestTickets, int rowSize, int colSize) {
        this(ticketPrice, venueEarningsPerTicket, musicianBaseEarningsPerTicket, ticketingStartAt, concertStartAt, musicians, posterCid);
        this.numOfRestTickets = numOfRestTickets;
        this.rowSize = rowSize;
        this.colSize = colSize;
    }
}
