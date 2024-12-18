package com.ssafy.jdbc.melodiket.ticket.controller;

import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketResponse;
import com.ssafy.jdbc.melodiket.ticket.service.TicketService;
import com.ssafy.jdbc.melodiket.ticket.validation.ValidRefundUUID;
import com.ssafy.jdbc.melodiket.ticket.validation.ValidUseUUID;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.webpush.controller.dto.AcceptedResp;
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
    public ResponseEntity<AcceptedResp> purchaseTicket(Authentication authentication, @RequestBody @Valid TicketPurchaseRequest ticketPurchaseRequest) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        ticketService.checkTicketPurchaseAvailable(user, ticketPurchaseRequest);
        ticketService.approveTransfer(user, ticketPurchaseRequest.getConcertId());
        String operationId = UUID.randomUUID().toString();
        ticketService.createTicket(user.getLoginId(), user, ticketPurchaseRequest, operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
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
    public ResponseEntity<AcceptedResp> refundTicket(Authentication authentication, @PathVariable @Valid @ValidRefundUUID UUID ticketUuid) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        ticketService.checkTicketRefundAvailable(user, ticketUuid);
        String operationId = UUID.randomUUID().toString();
        ticketService.refundTicket(user.getLoginId(), ticketUuid, operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
    }

    @PostMapping("/{ticketUuid}/use")
    public ResponseEntity<AcceptedResp> useTicket(Authentication authentication, @PathVariable @Valid @ValidUseUUID UUID ticketUuid) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        String operationId = UUID.randomUUID().toString();
        ticketService.useTicket(user.getLoginId(), user, ticketUuid, operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
    }
}
