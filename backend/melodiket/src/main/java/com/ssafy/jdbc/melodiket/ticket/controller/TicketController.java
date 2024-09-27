package com.ssafy.jdbc.melodiket.ticket.controller;

import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.ticket.validation.ValidRefundUUID;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {

    @PostMapping
    public ResponseEntity<String> purchaseTicket(@RequestBody @Valid TicketPurchaseRequest ticketPurchaseRequest){
        return ResponseEntity.ok("");
    }

    @PostMapping("/{ticketUuid}/refund")
    public ResponseEntity<String> refundTicket(@PathVariable @Valid @ValidRefundUUID UUID ticketUuid){
        return ResponseEntity.ok("");
    }

}
