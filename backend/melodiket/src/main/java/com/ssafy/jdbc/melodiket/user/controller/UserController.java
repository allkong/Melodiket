package com.ssafy.jdbc.melodiket.user.controller;

import com.ssafy.jdbc.melodiket.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;

    // loginId 중복 체크 API
    @PostMapping("/login-id/field-duplication-check")
    public ResponseEntity<Map<String, Boolean>> checkLoginIdDuplication(@RequestBody Map<String, String> request) {
        String loginId = request.get("loginId");
        boolean isLoginIdDuplicated = authService.checkLoginIdDuplication(loginId);
        return ResponseEntity.ok(Map.of("loginId", isLoginIdDuplicated));
    }

    // nickname 중복 체크 API
    @PostMapping("/nickname/field-duplication-check")
    public ResponseEntity<Map<String, Boolean>> checkNicknameDuplication(@RequestBody Map<String, String> request) {
        String nickname = request.get("nickname");
        boolean isNicknameDuplicated = authService.checkNicknameDuplication(nickname);
        return ResponseEntity.ok(Map.of("nickname", isNicknameDuplicated));
    }
}