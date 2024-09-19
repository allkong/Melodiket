package com.ssafy.jdbc.melodiket.auth.controller;

import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginResp;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpResp;
import com.ssafy.jdbc.melodiket.auth.entity.Role;
import com.ssafy.jdbc.melodiket.auth.service.AuthService;
import com.ssafy.jdbc.melodiket.auth.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    // 관객 회원 가입
    @PostMapping("/sign-up/audience")
    public ResponseEntity<SignUpResp> signUpAudience(@Valid @RequestBody SignUpReq signUpReq) {
        SignUpResp response = userService.signUp(signUpReq, Role.AUDIENCE);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 뮤지션 회원 가입
    @PostMapping("/sign-up/musician")
    public ResponseEntity<SignUpResp> signUpMusician(@Valid @RequestBody SignUpReq signUpReq) {
        SignUpResp response = userService.signUp(signUpReq, Role.MUSICIAN);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 공연장 관리자 회원 가입
    @PostMapping("/sign-up/stage-manager")
    public ResponseEntity<SignUpResp> signUpStageManager(@Valid @RequestBody SignUpReq signUpReq) {
        SignUpResp response = userService.signUp(signUpReq, Role.STAGE_MANAGER);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResp> login(@RequestBody LoginReq loginReq) {
        LoginResp response = userService.login(loginReq);
        return ResponseEntity.ok(response);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        userService.logout();
        return ResponseEntity.ok("로그아웃 성공");
    }

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
