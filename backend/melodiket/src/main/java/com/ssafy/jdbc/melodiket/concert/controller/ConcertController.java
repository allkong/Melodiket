package com.ssafy.jdbc.melodiket.concert.controller;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.concert.controller.dto.ConcertResp;
import com.ssafy.jdbc.melodiket.concert.controller.dto.CreateConcertReq;
import com.ssafy.jdbc.melodiket.concert.service.ConcertService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/concerts")
@RequiredArgsConstructor
public class ConcertController {

    private final ConcertService concertService;

    @GetMapping
    public ResponseEntity<PageResponse<ConcertResp>> getConcerts(
            CursorPagingReq cursorPagingReq) {
        PageResponse<ConcertResp> concerts = concertService.getConcerts(cursorPagingReq);
        return ResponseEntity.ok(concerts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConcertResp> getConcertDetail(@PathVariable UUID id) {
        ConcertResp concertDetail = concertService.getConcertDetail(id);
        return ResponseEntity.ok(concertDetail);
    }

    @PostMapping
    public ResponseEntity<ConcertResp> createConcert(@RequestBody CreateConcertReq createConcertReq) {
        ConcertResp concertResp = concertService.createConcert(createConcertReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(concertResp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelConcert(@PathVariable UUID id) {
        concertService.cancelConcert(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Void> approveConcert(@PathVariable("id") UUID concertId, Principal principal) {
        String loginId = principal.getName();
        concertService.approveConcert(concertId, loginId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/deny")
    public ResponseEntity<Void> denyConcert(@PathVariable("id") UUID concertId, Principal principal) {
        String loginId = principal.getName();
        concertService.denyConcert(concertId, loginId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/by-stage-managers/{id}")
    public ResponseEntity<PageResponse<ConcertResp>> getConcertsByStageManager(
            @PathVariable UUID id,
            @Valid CursorPagingReq cursorPagingReq) {

        PageResponse<ConcertResp> concerts = concertService.getConcertsByStageManager(id, cursorPagingReq);
        return ResponseEntity.ok(concerts);
    }

    @GetMapping("/by-stage/{id}")
    public ResponseEntity<PageResponse<ConcertResp>> getConcertsByStage(
            @PathVariable UUID id,
            @Valid CursorPagingReq cursorPagingReq) {

        PageResponse<ConcertResp> concerts = concertService.getConcertsByStage(id, cursorPagingReq);
        return ResponseEntity.ok(concerts);
    }
}
