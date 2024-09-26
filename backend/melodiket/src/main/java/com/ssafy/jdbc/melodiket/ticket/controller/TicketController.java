package com.ssafy.jdbc.melodiket.ticket.controller;

import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {

    @PostMapping
    public ResponseEntity<String> purchaseEntity(@RequestBody @Valid TicketPurchaseRequest ticketPurchaseRequest){
        return ResponseEntity.ok("");
    }

}
