package com.ssafy.jdbc.melodiket.concert.service.dto;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
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
public class SeatingConcertCreateReq extends ConcertCreateReq {
    private long numOfRestTickets;
    private long rowSize;
    private long colSize;

    public SeatingConcertCreateReq(UUID concertUuid, int ticketPrice, int venueEarningsPerTicket, int musicianBaseEarningsPerTicket, long ticketingStartAt, long concertStartAt, String[] musicians, String posterCid) {
        super(concertUuid, ticketPrice, venueEarningsPerTicket, musicianBaseEarningsPerTicket, ticketingStartAt, concertStartAt, musicians, posterCid);
    }

    public SeatingConcertCreateReq(UUID concertUuid, int ticketPrice, int venueEarningsPerTicket, int musicianBaseEarningsPerTicket, long ticketingStartAt, long concertStartAt, String[] musicians, String posterCid, int numOfRestTickets, int rowSize, int colSize) {
        this(concertUuid, ticketPrice, venueEarningsPerTicket, musicianBaseEarningsPerTicket, ticketingStartAt, concertStartAt, musicians, posterCid);
        this.numOfRestTickets = numOfRestTickets;
        this.rowSize = rowSize;
        this.colSize = colSize;
    }

    public SeatingConcertCreateReq(ConcertEntity concertEntity, List<String> musicianWalletAddresses, StageEntity stageEntity) {
        super(concertEntity, musicianWalletAddresses);
        this.rowSize = stageEntity.getNumOfRow();
        this.colSize = stageEntity.getNumOfCol();
        this.numOfRestTickets = stageEntity.getNumOfRow() * stageEntity.getNumOfCol();
    }
}
