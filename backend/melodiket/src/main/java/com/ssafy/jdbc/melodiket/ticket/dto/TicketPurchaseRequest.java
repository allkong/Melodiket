package com.ssafy.jdbc.melodiket.ticket.dto;

import com.ssafy.jdbc.melodiket.ticket.validation.ValidPurchaseRequest;
import lombok.Getter;

import java.util.UUID;

@ValidPurchaseRequest
@Getter
public class TicketPurchaseRequest {
    UUID concertId;
    Long seatRow;
    Long seatCol;
    UUID favoriteMusician;
}
