package com.ssafy.jdbc.melodiket.concert.controller;

import com.ssafy.jdbc.melodiket.ticket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/concerts/seats")
@RequiredArgsConstructor
public class ConcertSeatController {

    private final TicketService ticketService;

    @GetMapping("/{id}")
    public ResponseEntity<boolean[][]> getSeatAvailability(@PathVariable UUID id) {
        boolean[][] seatAvailability = ticketService.getSeatAvailability(id);
        return ResponseEntity.ok(seatAvailability);
    }
}
