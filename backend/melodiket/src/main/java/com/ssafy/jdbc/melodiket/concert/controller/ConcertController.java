package com.ssafy.jdbc.melodiket.concert.controller;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.concert.controller.dto.*;
import com.ssafy.jdbc.melodiket.concert.service.ConcertService;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.webpush.controller.dto.AcceptedResp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/concerts")
@RequiredArgsConstructor
public class ConcertController {

    private final ConcertService concertService;

    @GetMapping
    public ResponseEntity<PageResponse<ConcertResp>> getConcerts(
            ConcertCursorPagingReq cursorPagingReq) {
        PageResponse<ConcertResp> concerts = concertService.getConcerts(cursorPagingReq);
        return ResponseEntity.ok(concerts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConcertResp> getConcertDetail(@PathVariable UUID id) {
        ConcertResp concertDetail = concertService.getConcertDetail(id);
        return ResponseEntity.ok(concertDetail);
    }

    @PostMapping("/create")
    public ResponseEntity<AcceptedResp> createConcert(Authentication authentication, @RequestBody CreateConcertReq createConcertReq) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        String operationId = UUID.randomUUID().toString();
        concertService.createConcert(user.getLoginId(), user, createConcertReq, operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AcceptedResp> cancelConcert(Authentication authentication, @PathVariable UUID id) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        String operationId = UUID.randomUUID().toString();
        concertService.cancelConcert(user.getLoginId(), user, id, operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<AcceptedResp> approveConcert(@PathVariable("id") UUID concertId, Principal principal, @RequestBody ConcertApproveReq concertApproveReq) {
        String loginId = principal.getName();
        String operationId = UUID.randomUUID().toString();
        concertService.approveConcert(concertId, loginId, concertApproveReq, operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
    }

    @PostMapping("/{id}/deny")
    public ResponseEntity<AcceptedResp> denyConcert(@PathVariable("id") UUID concertId, Principal principal) {
        String loginId = principal.getName();
        String operationId = UUID.randomUUID().toString();
        concertService.denyConcert(concertId, loginId, operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
    }

    @GetMapping("/by-stage-managers/{id}")
    public ResponseEntity<PageResponse<ConcertResp>> getConcertsByStageManager(
            @PathVariable UUID id,
            @Valid ConcertCursorPagingReq cursorPagingReq) {

        PageResponse<ConcertResp> concerts = concertService.getConcertsByStageManager(id, cursorPagingReq);
        return ResponseEntity.ok(concerts);
    }

    @GetMapping("/by-stage/{id}")
    public ResponseEntity<PageResponse<ConcertResp>> getConcertsByStage(
            @PathVariable UUID id,
            @Valid ConcertCursorPagingReq cursorPagingReq) {

        PageResponse<ConcertResp> concerts = concertService.getConcertsByStage(id, cursorPagingReq);
        return ResponseEntity.ok(concerts);
    }

    @GetMapping("/by-musician/{id}")
    public ResponseEntity<PageResponse<ConcertResp>> getConcertsByMusician(
            @PathVariable UUID id,
            @Valid ConcertCursorPagingReq cursorPagingReq) {

        PageResponse<ConcertResp> concerts = concertService.getConcertsByMusician(id, cursorPagingReq);
        return ResponseEntity.ok(concerts);
    }

    @GetMapping("/me/assigned")
    public ResponseEntity<PageResponse<ConcertAssignmentResp>> getAssignedConcerts(Authentication authentication, @Valid CursorPagingReq cursorPagingReq) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        PageResponse<ConcertAssignmentResp> assignments = concertService.getAssignedConcerts(user, cursorPagingReq);
        return ResponseEntity.ok(assignments);
    }

    @PostMapping("/{id}/close")
    public ResponseEntity<AcceptedResp> closeConcert(Authentication authentication, @PathVariable UUID id) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        concertService.checkIsConcertClosable(user, id);
        String operationId = UUID.randomUUID().toString();
        concertService.closeConcert(user.getLoginId(), user, id, operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
    }

    @GetMapping("/me/created")
    public ResponseEntity<List<ConcertResp>> getCreatedConcerts(Authentication authentication) {
        UUID stageManagerUuid = ((AppUserEntity) authentication.getPrincipal()).getUuid();
        List<ConcertResp> createdConcerts = concertService.getCreatedConcertsByStageManager(stageManagerUuid);
        return ResponseEntity.ok(createdConcerts);
    }
}
