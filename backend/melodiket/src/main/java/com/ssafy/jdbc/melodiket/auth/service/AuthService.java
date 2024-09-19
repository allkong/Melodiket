package com.ssafy.jdbc.melodiket.auth.service;

import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginResp;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpResp;
import com.ssafy.jdbc.melodiket.auth.entity.AppUser;
import com.ssafy.jdbc.melodiket.auth.entity.Role;

public interface AuthService {
    SignUpResp signUp(SignUpReq signUpReq, Role role);
    LoginResp login(LoginReq loginReq);
    void logout();
    AppUser findUserByUuid(String uuid) throws HttpResponseException;
    AppUser findUserByLoginId(String loginId) throws HttpResponseException;

    boolean checkLoginIdDuplication(String loginId);
    boolean checkNicknameDuplication(String nickname);
}

