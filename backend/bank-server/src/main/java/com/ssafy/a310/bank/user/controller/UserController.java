package com.ssafy.a310.bank.user.controller;

import com.ssafy.a310.bank.account.controller.dto.RegisterReq;
import com.ssafy.a310.bank.auth.service.JwtService;
import com.ssafy.a310.bank.auth.service.JwtType;
import com.ssafy.a310.bank.common.constant.MilliSecOf;
import com.ssafy.a310.bank.common.exception.ErrorDetail;
import com.ssafy.a310.bank.common.exception.HttpResponseException;
import com.ssafy.a310.bank.user.controller.dto.LoginResp;
import com.ssafy.a310.bank.user.service.UserService;
import com.ssafy.a310.bank.user.service.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Validated @RequestBody RegisterReq registerReq) {
        if (!isAvailableName(registerReq.name())) {
            throw new HttpResponseException(ErrorDetail.ALREADY_EXIST_USER);
        }

        userService.createUser(registerReq.name(), registerReq.yymmdd());
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResp> login(@Validated @RequestBody RegisterReq registerReq) {
        if (!isAvailableName(registerReq.name())) {
            throw new HttpResponseException(ErrorDetail.ALREADY_EXIST_USER);
        }

        try {
            User user = userService.getUserByLoginReq(registerReq.name(), registerReq.yymmdd());
            String accessToken = jwtService
                    .generateToken(JwtType.AUTH_ACCESS, Map.of("uuid", user.getUuid()), 3 * MilliSecOf.HOURS);
            LoginResp resp = new LoginResp(user, accessToken);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            throw new HttpResponseException(ErrorDetail.UNKNOWN_USER_INFO);
        }
    }

    public boolean isAvailableName(String name) {
        return userService.isAvailableName(name);
    }
}
