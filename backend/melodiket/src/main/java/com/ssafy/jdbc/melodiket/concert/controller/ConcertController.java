package com.ssafy.jdbc.melodiket.concert.controller;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.concert.controller.dto.*;
import com.ssafy.jdbc.melodiket.concert.service.ConcertService;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
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
    public ResponseEntity<Void> createConcert(Authentication authentication, @RequestBody CreateConcertReq createConcertReq) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        concertService.createConcert(user.getLoginId(), user, createConcertReq);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelConcert(Authentication authentication, @PathVariable UUID id) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        concertService.cancelConcert(user.getLoginId(), user, id);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Void> approveConcert(@PathVariable("id") UUID concertId, Principal principal, @RequestBody ConcertApproveReq concertApproveReq) {
        String loginId = principal.getName();
        concertService.approveConcert(concertId, loginId, concertApproveReq);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/{id}/deny")
    public ResponseEntity<Void> denyConcert(@PathVariable("id") UUID concertId, Principal principal) {
        String loginId = principal.getName();
        concertService.denyConcert(concertId, loginId);
        return ResponseEntity.accepted().build();
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

    @GetMapping("/me/assigned")
    public ResponseEntity<PageResponse<ConcertAssignmentResp>> getAssignedConcerts(Authentication authentication, @Valid CursorPagingReq cursorPagingReq) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        PageResponse<ConcertAssignmentResp> assignments = concertService.getAssignedConcerts(user, cursorPagingReq);
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/me/created")
    public ResponseEntity<List<ConcertResp>> getCreatedConcerts(Authentication authentication) {
        UUID stageManagerUuid = ((AppUserEntity) authentication.getPrincipal()).getUuid();
        List<ConcertResp> createdConcerts = concertService.getCreatedConcertsByStageManager(stageManagerUuid);
        return ResponseEntity.ok(createdConcerts);
    }
}
