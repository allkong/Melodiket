package com.ssafy.jdbc.melodiket.user.service;

import com.ssafy.jdbc.melodiket.auth.service.JwtService;
import com.ssafy.jdbc.melodiket.auth.service.JwtType;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.user.controller.authdto.LoginResp;
import com.ssafy.jdbc.melodiket.user.controller.authdto.SignUpReq;
import com.ssafy.jdbc.melodiket.user.controller.authdto.SignUpResp;
import com.ssafy.jdbc.melodiket.user.entity.Role;
import com.ssafy.jdbc.melodiket.user.repository.AppUserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.ssafy.jdbc.melodiket.user.controller.authdto.LoginReq;
import com.ssafy.jdbc.melodiket.user.entity.AppUser;
import com.ssafy.jdbc.melodiket.user.util.PasswordUtil;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Builder
@Slf4j
public class UserService implements AuthService{

    private final AppUserRepository appUserRepository;
    private final JwtService jwtService;

    @Override
    public SignUpResp signUp(SignUpReq signUpReq, Role role) {

        if(appUserRepository.existsByLoginId(signUpReq.loginId()))
            throw new HttpResponseException(ErrorDetail.DUPLICATED_LOGIN_ID);

        if(appUserRepository.existsByNickname(signUpReq.nickname()))
            throw new HttpResponseException(ErrorDetail.DUPLICATED_NICKNAME);

        String salt = PasswordUtil.generateSalt();
        String hashedPassword = PasswordUtil.hashPassword(signUpReq.password(), salt);

        AppUser appUser = AppUser.builder()
                .uuid(UUID.randomUUID())
                .loginId(signUpReq.loginId())
                .password(hashedPassword)
                .salt(salt)
                .nickname(signUpReq.nickname())
                .role(role)
                .description(signUpReq.description())
                .build();

        AppUser user = appUserRepository.save(appUser);

        return new SignUpResp(
                user.getId(),
                user.getUuid(),
                user.getLoginId(),
                user.getNickname(),
                user.getRole(),
                user.getDescription()
        );
    }

    @Override
    public LoginResp login(LoginReq loginReq) {
        AppUser user = appUserRepository.findByLoginId(loginReq.loginId())
                //Todo : Exception 재정의
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.UNAUTHORIZED));

        if(!PasswordUtil.verifyPassword(loginReq.password(), user.getPassword(), user.getSalt())) {
            throw new HttpResponseException(ErrorDetail.LOGIN_FAILED);
        }

        String token = jwtService.generateToken(
                JwtType.AUTH_ACCESS,  // 토큰 타입
                Map.of("uuid", user.getUuid().toString(),
                        "role", user.getRole().name()
                ),  // Payload에 사용자 UUID 추가

                3600000  // 1시간
        );
        return new LoginResp(
                token,
                user.getNickname(),
                user.getRole().name()
        );
    }

    @Override
    public void logout() {

    }

    @Override
    public AppUser findUserByUuid(String uuid) throws HttpResponseException {
        return appUserRepository.findByUuid(UUID.fromString(uuid))
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.NOT_FOUND));
    }

    @Override
    public AppUser findUserByLoginId(String loginId) throws HttpResponseException {
        return appUserRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.NOT_FOUND));
    }

    @Override
    public boolean checkLoginIdDuplication(String loginId) {
        if(loginId == null || loginId.trim().isEmpty()){
            throw new HttpResponseException(ErrorDetail.INVALID_INPUT_VALUE);
        }
        return appUserRepository.existsByLoginId(loginId);
    }

    @Override
    public boolean checkNicknameDuplication(String nickname) {
        if(nickname == null || nickname.trim().isEmpty()){
            throw new HttpResponseException(ErrorDetail.INVALID_INPUT_VALUE);
        }
        return appUserRepository.existsByNickname(nickname);
    }
}