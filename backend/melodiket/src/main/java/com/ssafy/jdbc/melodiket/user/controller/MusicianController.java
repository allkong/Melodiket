package com.ssafy.jdbc.melodiket.user.controller;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianToggleLikeResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.service.FavoriteMusicianService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users/musicians")
@RequiredArgsConstructor
public class MusicianController {

    private final FavoriteMusicianService favoriteMusicianService;

    @PostMapping("/{id}/like")
    public ResponseEntity<MusicianToggleLikeResp> toggleLikeMusician(Authentication authentication, @PathVariable UUID id) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        boolean isLiked = favoriteMusicianService.toggleLikeMusician(user.getUuid(), id);
        return ResponseEntity.ok(new MusicianToggleLikeResp(isLiked));
    }

    @GetMapping("/liked/me")
    public ResponseEntity<PageResponse<MusicianResp>> getLikedMusicians(
            Authentication authentication,
            @Valid CursorPagingReq pagingReq
    ) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        PageResponse<MusicianResp> response = favoriteMusicianService.findLikedMusiciansByAudience(user.getUuid(), pagingReq);
        return ResponseEntity.ok(response);
    }
}
