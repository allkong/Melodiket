package com.ssafy.jdbc.melodiket.ticket.controller;

import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketResponse;
import com.ssafy.jdbc.melodiket.ticket.service.TicketService;
import com.ssafy.jdbc.melodiket.ticket.validation.ValidRefundUUID;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<TicketResponse> purchaseTicket(Principal principal, @RequestBody @Valid TicketPurchaseRequest ticketPurchaseRequest){
        return new ResponseEntity<>(ticketService.createTicket(principal.getName(), ticketPurchaseRequest), HttpStatus.CREATED);
    }

    @PostMapping("/{ticketUuid}/refund")
    public ResponseEntity<String> refundTicket(@PathVariable @Valid @ValidRefundUUID UUID ticketUuid){
        return ResponseEntity.ok("");
    }

}
