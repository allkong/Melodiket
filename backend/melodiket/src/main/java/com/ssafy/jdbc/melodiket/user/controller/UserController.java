package com.ssafy.jdbc.melodiket.user.controller;

import com.ssafy.jdbc.melodiket.auth.service.AuthService;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.UpdateUserReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianDetailResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerDetailResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.service.FavoriteMusicianService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final FavoriteMusicianService favoriteMusicianService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResp> getAuthenticatedUserProfile(Principal principal) {
        String loginId = principal.getName();
        UserProfileResp userProfile = authService.getUserProfileByLoginId(loginId);
        return ResponseEntity.ok(userProfile);
    }

    @PatchMapping("/me")
    public ResponseEntity<UserProfileResp> updateUser(@RequestBody UpdateUserReq updateUserReq, Authentication authentication) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        UserProfileResp updateUser = authService.updateUser(user.getUuid(), updateUserReq);
        return ResponseEntity.ok(updateUser);
    }

    @GetMapping("/stage-managers")
    public ResponseEntity<StageManagerResp> getStageManagers(@RequestParam(defaultValue = "1") int pageNo,
                                                             @RequestParam(defaultValue = "10") int pageSize) {
        StageManagerResp stageManagerResp = authService.getStageManagers(pageNo, pageSize);
        return ResponseEntity.ok(stageManagerResp);
    }

    @GetMapping("/stage-managers/{id}")
    public ResponseEntity<StageManagerDetailResp> getStageManagerDetail(@PathVariable UUID id) {
        StageManagerDetailResp stageManagerDetail = authService.getStageManagerDetail(id);
        return ResponseEntity.ok(stageManagerDetail);
    }

    @GetMapping("/musicians")
    public ResponseEntity<MusicianResp> getMusicians(@RequestParam(defaultValue = "1") int pageNo,
                                                     @RequestParam(defaultValue = "10") int pageSize) {
        MusicianResp musicianResp = authService.getMusicians(pageNo, pageSize);
        return ResponseEntity.ok(musicianResp);
    }

    @GetMapping("/musicians/{id}")
    public ResponseEntity<MusicianDetailResp> getMusicianDetail(@PathVariable UUID id) {
        MusicianDetailResp musicianDetailResp = authService.getMusicianDetail(id);
        return ResponseEntity.ok(musicianDetailResp);
    }

    @PostMapping("/musicians/{id}/like")
    public ResponseEntity<Map<String, Object>> toggleLikeMusician(@RequestParam UUID audienceId, @PathVariable UUID id) {

        boolean isLiked = favoriteMusicianService.toggleLikeMusician(audienceId, id);

        // TODO : responseBody 확인 과정 으로 Map 으로 선구현, 나중에 Void 로다시변경
        Map<String, Object> response = new HashMap<>();
        response.put("status", isLiked ? "찜 등록 성공" : "찜 해제 성공");
        response.put("musicianId", id);

        return ResponseEntity.ok(response);
//        favoriteMusicianService.toggleLikeMusician(audienceId, id);
//        return ResponseEntity.ok().build();
    }

    @GetMapping("/musicians/liked/me")
    public ResponseEntity<PageResponse<UserProfileResp>> getLikedMusicians(
            @RequestParam UUID audienceId,
            Pageable pageable
    ) {
        PageResponse<UserProfileResp> response = favoriteMusicianService.findLikedMusiciansByAudience(audienceId, pageable);
        return ResponseEntity.ok(response);
    }
}
