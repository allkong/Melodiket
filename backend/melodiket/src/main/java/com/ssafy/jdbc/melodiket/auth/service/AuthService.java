package com.ssafy.jdbc.melodiket.auth.service;

import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginResp;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUser;
import com.ssafy.jdbc.melodiket.user.entity.Role;
import com.ssafy.jdbc.melodiket.user.controller.dto.UpdateUserReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;

import java.util.UUID;

public interface AuthService {
    SignUpResp signUp(SignUpReq signUpReq, Role role);
    LoginResp login(LoginReq loginReq);
    void logout();
    AppUser findUserByUuid(String uuid) throws HttpResponseException;
    AppUser findUserByLoginId(String loginId) throws HttpResponseException;
    // 아이디 중복 검사
    boolean checkLoginIdDuplication(String loginId);
    // 닉네임 중복 검사
    boolean checkNicknameDuplication(String nickname);
    // 본인 정보 조회
    UserProfileResp getUserProfileByLoginId(String loginId) throws HttpResponseException;
    // 유저 정보 업데이트
    UserProfileResp updateUser(UUID uuid, UpdateUserReq updateUserReq);

}

