package com.ssafy.jdbc.melodiket.concert.controller;

import com.ssafy.jdbc.melodiket.concert.controller.dto.FavoriteConcertResp;
import com.ssafy.jdbc.melodiket.concert.service.FavoriteConcertService;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/concerts")
@RequiredArgsConstructor
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

    @GetMapping("/favorite/me")
    public ResponseEntity<List<FavoriteConcertResp>> getLikedConcerts(Authentication authentication) {
        UUID audienceUuid = ((AppUserEntity) authentication.getPrincipal()).getUuid();

        List<FavoriteConcertResp> likedConcerts = favoriteConcertService.getLikedConcerts(audienceUuid);
        return ResponseEntity.ok(likedConcerts);
    }
}
