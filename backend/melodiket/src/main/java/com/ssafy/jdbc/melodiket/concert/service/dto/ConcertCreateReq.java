package com.ssafy.jdbc.melodiket.concert.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
public class ConcertCreateReq {
    private int ticketPrice;
    private int venueEarningsPerTicket;
    private int musicianBaseEarningsPerTicket;
    private long ticketingStartAt;
    private long concertStartAt;
    private String[] musicians;
    private String posterCid;
}
