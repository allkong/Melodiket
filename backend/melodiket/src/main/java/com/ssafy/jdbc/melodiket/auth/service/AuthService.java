package com.ssafy.jdbc.melodiket.auth.service;

import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginResp;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpResp;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.user.controller.dto.UpdateUserReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianDetailResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerDetailResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.Role;

import java.util.UUID;

public interface AuthService {

    //TODO : 사실 이 폴더에 있는거 아닌거같은데 이름은 authService긴한데 이름도 잘못된거같고 위치도 잘못된거같음
    //TODO : 나중에 User 로 폴더경로 옮기고 이름 바꾸는 방향으로 생각중
    SignUpResp signUp(SignUpReq signUpReq, Role role);

    LoginResp login(LoginReq loginReq);

    void logout();

    AppUserEntity findUserByUuid(String uuid) throws HttpResponseException;

    AppUserEntity findUserByLoginId(String loginId) throws HttpResponseException;

    // 아이디 중복 검사
    boolean checkLoginIdDuplication(String loginId);

    // 닉네임 중복 검사
    boolean checkNicknameDuplication(String nickname);

    // 본인 정보 조회
    UserProfileResp getUserProfileByLoginId(String loginId) throws HttpResponseException;

    // 유저 정보 업데이트
    UserProfileResp updateUser(UUID uuid, UpdateUserReq updateUserReq);

    // PageNation 기법 활용 공연관리자들 조회
    StageManagerResp getStageManagers(int pageNo, int pageSize);

    // StageManager 상세조회
    StageManagerDetailResp getStageManagerDetail(UUID id);

    // PageNation 기법 활용 뮤지션들 조회
    MusicianResp getMusicians(int pageNo, int pageSize);

    // Musician 상세조회
    MusicianDetailResp getMusicianDetail(UUID id);
}
