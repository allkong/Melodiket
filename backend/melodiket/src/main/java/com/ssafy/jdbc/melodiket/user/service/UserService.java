package com.ssafy.jdbc.melodiket.user.service;

import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginResp;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpResp;
import com.ssafy.jdbc.melodiket.auth.service.AuthService;
import com.ssafy.jdbc.melodiket.auth.service.JwtService;
import com.ssafy.jdbc.melodiket.auth.service.JwtType;
import com.ssafy.jdbc.melodiket.auth.util.PasswordUtil;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageInfo;
import com.ssafy.jdbc.melodiket.user.controller.dto.UpdateUserReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianDetailResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerDetailResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerResp;
import com.ssafy.jdbc.melodiket.user.entity.*;
import com.ssafy.jdbc.melodiket.user.repository.AppUserRepository;
import com.ssafy.jdbc.melodiket.user.repository.AudienceRepository;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Builder
@Slf4j
public class UserService implements AuthService {

    public static final String LIKE_COUNT = "likeCount"; // 좋아요 개수
    public static final String REGISTERED_AT = "registeredAt"; // 등록 날짜

    private final AppUserRepository appUserRepository;
    private final AudienceRepository audienceRepository;
    private final MusicianRepository musicianRepository;
    private final StageManagerRepository stageMangerRepository;
    private final JwtService jwtService;

    @Override
    public SignUpResp signUp(SignUpReq signUpReq, Role role) {

        if (appUserRepository.existsByLoginId(signUpReq.loginId()))
            throw new HttpResponseException(ErrorDetail.DUPLICATED_LOGIN_ID);

        if (appUserRepository.existsByNickname(signUpReq.nickname()))
            throw new HttpResponseException(ErrorDetail.DUPLICATED_NICKNAME);

        String salt = PasswordUtil.generateSalt();
        String hashedPassword = PasswordUtil.hashPassword(signUpReq.password(), salt);
        if (role == Role.AUDIENCE) {
            AudienceEntity audience = AudienceEntity.builder()
                    .uuid(UUID.randomUUID())
                    .loginId(signUpReq.loginId())
                    .password(hashedPassword)
                    .salt(salt)
                    .nickname(signUpReq.nickname())
                    .role(role)
                    .description(signUpReq.description())
                    .registeredAt(LocalDateTime.now())
                    .imageUrl("1234")
                    .build();
            audienceRepository.save(audience);

            return new SignUpResp(
                    audience.getId(),
                    audience.getUuid(),
                    audience.getLoginId(),
                    audience.getNickname(),
                    audience.getRole(),
                    audience.getDescription()
            );
        } else if (role == Role.MUSICIAN) {
            MusicianEntity musician = MusicianEntity.builder()
                    .uuid(UUID.randomUUID())
                    .loginId(signUpReq.loginId())
                    .password(hashedPassword)
                    .salt(salt)
                    .nickname(signUpReq.nickname())
                    .role(role)
                    .description(signUpReq.description())
                    .registeredAt(LocalDateTime.now())
                    .imageUrl("1234")
                    .build();
            musicianRepository.save(musician);

            return new SignUpResp(
                    musician.getId(),
                    musician.getUuid(),
                    musician.getLoginId(),
                    musician.getNickname(),
                    musician.getRole(),
                    musician.getDescription()
            );
        } else {
            StageManagerEntity stageManager = StageManagerEntity.builder()
                    .uuid(UUID.randomUUID())
                    .loginId(signUpReq.loginId())
                    .password(hashedPassword)
                    .salt(salt)
                    .nickname(signUpReq.nickname())
                    .role(role)
                    .description(signUpReq.description())
                    .registeredAt(LocalDateTime.now())
                    .imageUrl("1234")
                    .build();
            stageMangerRepository.save(stageManager);
            return new SignUpResp(
                    stageManager.getId(),
                    stageManager.getUuid(),
                    stageManager.getLoginId(),
                    stageManager.getNickname(),
                    stageManager.getRole(),
                    stageManager.getDescription()
            );
        }
    }

    @Override
    public LoginResp login(LoginReq loginReq) {
        AppUserEntity user = appUserRepository.findByLoginId(loginReq.loginId())
                //Todo : Exception 재정의
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.UNAUTHORIZED));

        if (!PasswordUtil.verifyPassword(loginReq.password(), user.getPassword(), user.getSalt())) {
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
    public AppUserEntity findUserByUuid(String uuid) throws HttpResponseException {
        return appUserRepository.findByUuid(UUID.fromString(uuid))
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
    }

    @Override
    public AppUserEntity findUserByLoginId(String loginId) throws HttpResponseException {
        return appUserRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
    }

    @Override
    public boolean checkLoginIdDuplication(String loginId) {
        if (loginId == null || loginId.trim().isEmpty()) {
            throw new HttpResponseException(ErrorDetail.INVALID_INPUT_VALUE);
        }
        return appUserRepository.existsByLoginId(loginId);
    }

    @Override
    public boolean checkNicknameDuplication(String nickname) {
        if (nickname == null || nickname.trim().isEmpty()) {
            throw new HttpResponseException(ErrorDetail.INVALID_INPUT_VALUE);
        }
        return appUserRepository.existsByNickname(nickname);
    }

    @Override
    public UserProfileResp getUserProfileByLoginId(String loginId) {
        AppUserEntity appUserEntity = appUserRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        return new UserProfileResp(
                appUserEntity.getLoginId(),
                appUserEntity.getRole().name(),
                appUserEntity.getNickname(),
                appUserEntity.getDescription(),
                appUserEntity.getRegisteredAt(),
                null, // imageUrl 선개발시 처리
                null  // walletInfo 선개발시 처리
        );
    }

    @Override
    public UserProfileResp updateUser(UUID uuid, UpdateUserReq updateUserReq) {
        AppUserEntity user = appUserRepository.findByUuid(uuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        // 닉네임 유효성 검사
        if (updateUserReq.nickname().isPresent()) {
            String newNickname = updateUserReq.nickname().get();
            if (newNickname.length() < 2) {
                throw new HttpResponseException(ErrorDetail.INVALID_INPUT_VALUE);
            }
            if (!newNickname.equals(user.getNickname()) && appUserRepository.existsByNickname(newNickname)) {
                throw new HttpResponseException(ErrorDetail.DUPLICATED_NICKNAME);
            }
        }

        // 유저 정보 변경
        AppUserEntity updateUser = user.toBuilder()
                .nickname(updateUserReq.nickname().orElse(user.getNickname()))
                .description(updateUserReq.description().orElse(user.getDescription()))
                .build();
        appUserRepository.save(updateUser);

        return new UserProfileResp(
                updateUser.getLoginId(),
                updateUser.getRole().name(),
                updateUser.getNickname(),
                updateUser.getDescription(),
                updateUser.getRegisteredAt(),
                null, // imageUrl 선개발시 처리
                null  // walletInfo 선개발시 처리
        );
    }

    // StageManager 들 조회
    public StageManagerResp getStageManagers(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<AppUserEntity> stageManagerPage = appUserRepository.findByRole(Role.STAGE_MANAGER, pageable);

        List<UserProfileResp> stageManagers = stageManagerPage.getContent().stream()
                .map(user -> new UserProfileResp(
                        user.getLoginId(),
                        user.getRole().name(),
                        user.getNickname(),
                        user.getDescription(),
                        user.getRegisteredAt(),
                        null,  // TODO : imageUrl 선개발시 null 처리
                        null   // TODO :walletInfo 선개발시 null 처리
                ))
                .toList();

        return new StageManagerResp(
                new PageInfo(
                        stageManagerPage.hasNext(),
                        stageManagerPage.hasPrevious(),
                        pageNo,
                        pageSize,
                        stageManagerPage.getNumberOfElements()
                ),
                stageManagers
        );
    }

    @Override
    public StageManagerDetailResp getStageManagerDetail(UUID id) {
        AppUserEntity user = appUserRepository.findByUuid(id)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        return new StageManagerDetailResp(
                user.getLoginId(),
                user.getRole().name(),
                user.getNickname(),
                user.getDescription(),
                null,  // TODO : imageUrl 선개발시 null 처리
                null   // TODO :walletInfo 선개발시 null 처리
        );
    }

    @Override
    public MusicianResp getMusicians(int pageNo, int pageSize, String sortType) {

        Sort sort;

        // 정렬 기준 설정
        switch (sortType.toLowerCase()) {
            case "likes":
                sort = Sort.by(Sort.Direction.DESC, LIKE_COUNT); // 찜 많은 순
                break;
            case "registered":
                sort = Sort.by(Sort.Direction.ASC, REGISTERED_AT); // 등록 순
                break;
            case "latest":
                sort = Sort.by(Sort.Direction.DESC, REGISTERED_AT); // 최신순
                break;
            default:
                throw new HttpResponseException(ErrorDetail.INVALID_INPUT_VALUE);
        }

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Page<MusicianEntity> musiciansPage = musicianRepository.findAll(pageable);

        List<MusicianDetailResp> musicianDetails = musiciansPage.getContent().stream()
                .map(musician -> new MusicianDetailResp(
                        musician.getUuid(),
                        musician.getLoginId(),
                        musician.getRole().name(),
                        musician.getDescription(),
                        musician.getNickname(),
                        musician.getRegisteredAt(),
                        null,  // TODO : imageUrl 선개발시 null 처리
                        musician.getLikeCount(),
                        null   // TODO :walletInfo 선개발시 null 처리
                ))
                .toList();

        return new MusicianResp(
                new PageInfo(
                        musiciansPage.hasNext(),
                        musiciansPage.hasPrevious(),
                        pageNo,
                        pageSize,
                        musiciansPage.getNumberOfElements()
                ),
                musicianDetails
        );
    }

    @Override
    public MusicianDetailResp getMusicianDetail(UUID id) {
        MusicianEntity musician = musicianRepository.findByUuid(id)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        return new MusicianDetailResp(
                musician.getUuid(),
                musician.getLoginId(),
                musician.getRole().name(),
                musician.getNickname(),
                musician.getDescription(),
                musician.getRegisteredAt(),
                null,// TODO : imageUrl 선개발시 null 처리
                musician.getFavoriteMusicians().size(),
                null   // TODO :walletInfo 선개발시 null 처리
        );
    }
}