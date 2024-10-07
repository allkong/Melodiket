package com.ssafy.jdbc.melodiket.concert.controller;

import com.ssafy.jdbc.melodiket.concert.controller.dto.FavoriteConcertResp;
import com.ssafy.jdbc.melodiket.concert.service.FavoriteConcertService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/concerts")
@RequiredArgsConstructor
@Slf4j
public class FavoriteConcertController {

    private final FavoriteConcertService favoriteConcertService;

    @PostMapping("/{id}/favorite")
    public ResponseEntity<FavoriteConcertResp> toggleFavorite(
            @PathVariable UUID id,
            Authentication authentication
    ) {
        String loginId = authentication.getName();
        FavoriteConcertResp response = favoriteConcertService.toggleFavoriteConcert(id, loginId);
        return ResponseEntity.ok(response);
    }

}
