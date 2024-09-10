package com.ssafy.jdbc.melodiket.user.controller;

import com.ssafy.jdbc.melodiket.user.controller.dto.LoginReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.LoginResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.SignUpReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.SignUpResp;
import com.ssafy.jdbc.melodiket.user.entity.Role;
import com.ssafy.jdbc.melodiket.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

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
}
