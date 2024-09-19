package com.ssafy.jdbc.melodiket.user.service;

import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.user.controller.authdto.LoginReq;
import com.ssafy.jdbc.melodiket.user.controller.authdto.LoginResp;
import com.ssafy.jdbc.melodiket.user.controller.authdto.SignUpReq;
import com.ssafy.jdbc.melodiket.user.controller.authdto.SignUpResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUser;
import com.ssafy.jdbc.melodiket.user.entity.Role;

public interface AuthService {
    SignUpResp signUp(SignUpReq signUpReq, Role role);
    LoginResp login(LoginReq loginReq);
    void logout();
    AppUser findUserByUuid(String uuid) throws HttpResponseException;
    AppUser findUserByLoginId(String loginId) throws HttpResponseException;

    boolean checkLoginIdDuplication(String loginId);
    boolean checkNicknameDuplication(String nickname);
}

