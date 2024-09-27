package com.ssafy.jdbc.melodiket.user.controller;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import com.ssafy.jdbc.melodiket.user.service.FavoriteMusicianService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/musicians")
@RequiredArgsConstructor
public class MusicianController {

    private final FavoriteMusicianService favoriteMusicianService;

    @PostMapping("/{id}/like")
    public ResponseEntity<Map<String, Object>> toggleLikeMusician(@RequestParam UUID audienceId, @PathVariable UUID id) {

        boolean isLiked = favoriteMusicianService.toggleLikeMusician(audienceId, id);

        // TODO : responseBody 확인 과정 으로 Map 으로 선구현, 나중에 Void 로 다시변경
        Map<String, Object> response = new HashMap<>();
        response.put("status", isLiked ? "찜 등록 성공" : "찜 해제 성공");
        response.put("musicianId", id);

        return ResponseEntity.ok(response);
//        favoriteMusicianService.toggleLikeMusician(audienceId, id);
//        return ResponseEntity.ok().build();
    }

    @GetMapping("/liked/me")
    public ResponseEntity<PageResponse<UserProfileResp>> getLikedMusicians(
            @RequestParam UUID audienceId,
            CursorPagingReq pagingReq
    ) {
        PageResponse<UserProfileResp> response = favoriteMusicianService.findLikedMusiciansByAudience(audienceId, pagingReq);
        return ResponseEntity.ok(response);
    }
}
