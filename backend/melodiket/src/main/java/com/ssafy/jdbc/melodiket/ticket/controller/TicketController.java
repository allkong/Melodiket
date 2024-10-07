package com.ssafy.jdbc.melodiket.ticket.controller;

import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketResponse;
import com.ssafy.jdbc.melodiket.ticket.service.TicketService;
import com.ssafy.jdbc.melodiket.ticket.validation.ValidRefundUUID;
import com.ssafy.jdbc.melodiket.ticket.validation.ValidUseUUID;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<Void> purchaseTicket(Authentication authentication, @RequestBody @Valid TicketPurchaseRequest ticketPurchaseRequest) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        ticketService.checkTicketPurchaseAvailable(user, ticketPurchaseRequest);
        ticketService.approveTransfer(user, ticketPurchaseRequest.getConcertId());
        ticketService.createTicket(user.getLoginId(), user, ticketPurchaseRequest);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, List<TicketResponse>>> getMyTickets(Principal principal) {
        Map<String, List<TicketResponse>> tickets = ticketService.readMyTickets(principal.getName());
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/{ticketUuid}")
    public ResponseEntity<TicketResponse> getTicketDetail(@PathVariable UUID ticketUuid) {
        TicketResponse response = ticketService.readTicketDetail(ticketUuid);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{ticketUuid}/refund")
    public ResponseEntity<TicketResponse> refundTicket(@PathVariable @Valid @ValidRefundUUID UUID ticketUuid) {
        TicketResponse response = ticketService.refundTicket(ticketUuid);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{ticketUuid}/use")
    public ResponseEntity<Void> useTicket(Authentication authentication, @PathVariable @Valid @ValidUseUUID UUID ticketUuid) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        ticketService.useTicket(user.getLoginId(), user, ticketUuid);
        return ResponseEntity.accepted().build();
    }
}
