package com.ssafy.jdbc.melodiket.user.controller;

import com.ssafy.jdbc.melodiket.auth.service.AuthService;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.UpdateUserReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;


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
    public ResponseEntity<PageResponse<StageManagerResp>> getStageManagers(CursorPagingReq pagingReq) {
        PageResponse<StageManagerResp> stageManagerResp = authService.getStageManagers(pagingReq);
        return ResponseEntity.ok(stageManagerResp);
    }

    @GetMapping("/stage-managers/{id}")
    public ResponseEntity<StageManagerResp> getStageManagerDetail(@PathVariable UUID id) {
        StageManagerResp stageManagerDetail = authService.getStageManagerDetail(id);
        return ResponseEntity.ok(stageManagerDetail);
    }

    @GetMapping("/musicians")
    public ResponseEntity<PageResponse<MusicianResp>> getMusicians(CursorPagingReq pagingReq) {
        PageResponse<MusicianResp> musicianResp = authService.getMusicians(pagingReq);
        return ResponseEntity.ok(musicianResp);
    }

    @GetMapping("/musicians/{id}")
    public ResponseEntity<MusicianResp> getMusicianDetail(@PathVariable UUID id) {
        MusicianResp musicianResp = authService.getMusicianDetail(id);
        return ResponseEntity.ok(musicianResp);
    }
}
