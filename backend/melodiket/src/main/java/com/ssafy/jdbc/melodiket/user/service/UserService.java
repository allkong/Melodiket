package com.ssafy.jdbc.melodiket.user.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.LoginResp;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpReq;
import com.ssafy.jdbc.melodiket.auth.controller.dto.SignUpResp;
import com.ssafy.jdbc.melodiket.auth.service.AuthService;
import com.ssafy.jdbc.melodiket.auth.service.JwtService;
import com.ssafy.jdbc.melodiket.auth.service.JwtType;
import com.ssafy.jdbc.melodiket.auth.util.PasswordUtil;
import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.token.service.contract.MelodyTokenContract;
import com.ssafy.jdbc.melodiket.user.controller.dto.MusicianCursorPagingReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.UpdateUserReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerResp;
import com.ssafy.jdbc.melodiket.user.entity.*;
import com.ssafy.jdbc.melodiket.user.repository.*;
import com.ssafy.jdbc.melodiket.wallet.service.WalletService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.web3j.crypto.Credentials;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Builder
@Slf4j
public class UserService implements AuthService {

    public static final String LIKE_COUNT = "likeCount"; // 좋아요 개수
    public static final String REGISTERED_AT = "registeredAt"; // 등록 날짜

    private final RedisTemplate<String, String> redisTemplate;
    private final AppUserRepository appUserRepository;
    private final AudienceRepository audienceRepository;
    private final MusicianRepository musicianRepository;
    private final MusicianCursorRepository musicianCursorRepository;
    private final StageManagerRepository stageMangerRepository;
    private final StageManagerCursorRepository stageManagerCursorRepository;
    private final JwtService jwtService;
    private final WalletService walletService;
    private final BlockchainConfig blockchainConfig;
    private final Credentials systemCredential;

    @Transactional(rollbackOn = Exception.class)
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
                    .name(signUpReq.name())
                    .loginId(signUpReq.loginId())
                    .password(hashedPassword)
                    .salt(salt)
                    .nickname(signUpReq.nickname())
                    .role(role)
                    .description(signUpReq.description())
                    .imageUrl(signUpReq.imageUrl())
                    .registeredAt(LocalDateTime.now())
                    .build();
            audienceRepository.save(audience);
            walletService.createNewWallet(audience);

            WalletResp walletResp = walletService.getWalletOf(audience.getUuid());
            sendTokenToWallet(walletResp);

            return new SignUpResp(
                    audience.getId(),
                    audience.getUuid(),
                    signUpReq.name(),
                    audience.getLoginId(),
                    audience.getNickname(),
                    audience.getRole(),
                    audience.getDescription()
            );
        } else if (role == Role.MUSICIAN) {
            MusicianEntity musician = MusicianEntity.builder()
                    .uuid(UUID.randomUUID())
                    .name(signUpReq.name())
                    .loginId(signUpReq.loginId())
                    .password(hashedPassword)
                    .salt(salt)
                    .nickname(signUpReq.nickname())
                    .role(role)
                    .description(signUpReq.description())
                    .imageUrl(signUpReq.imageUrl())
                    .registeredAt(LocalDateTime.now())
                    .build();
            musicianRepository.save(musician);
            walletService.createNewWallet(musician);

            return new SignUpResp(
                    musician.getId(),
                    musician.getUuid(),
                    signUpReq.name(),
                    musician.getLoginId(),
                    musician.getNickname(),
                    musician.getRole(),
                    musician.getDescription()
            );
        } else {
            StageManagerEntity stageManager = StageManagerEntity.builder()
                    .uuid(UUID.randomUUID())
                    .name(signUpReq.name())
                    .loginId(signUpReq.loginId())
                    .password(hashedPassword)
                    .salt(salt)
                    .nickname(signUpReq.nickname())
                    .role(role)
                    .description(signUpReq.description())
                    .imageUrl(signUpReq.imageUrl())
                    .registeredAt(LocalDateTime.now())
                    .build();
            stageMangerRepository.save(stageManager);
            walletService.createNewWallet(stageManager);

            return new SignUpResp(
                    stageManager.getId(),
                    stageManager.getUuid(),
                    signUpReq.name(),
                    stageManager.getLoginId(),
                    stageManager.getNickname(),
                    stageManager.getRole(),
                    stageManager.getDescription()
            );
        }
    }

    private void sendTokenToWallet(WalletResp walletResp) {
        MelodyTokenContract melodyTokenContract = new MelodyTokenContract(blockchainConfig, systemCredential);
        melodyTokenContract.sendToken(walletResp.address(), 100000);
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

                360000000  // 100시간
        );
        return new LoginResp(
                token,
                user.getNickname(),
                user.getRole().name()
        );
    }

    @Override
    public void logout() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String token = jwtService.resolveToken(request);
        if (token == null) {
            throw new HttpResponseException(ErrorDetail.UNAUTHORIZED);
        } else {
            Claims claims = jwtService.getClaims(token);
            long expiration = claims.getExpiration().getTime() - System.currentTimeMillis();

            redisTemplate.opsForValue().set(token, "blacklisted", expiration, TimeUnit.MILLISECONDS);

            SecurityContextHolder.clearContext();
        }
    }

    @Override
    public AppUserEntity findUserByUuid(UUID uuid) throws HttpResponseException {
        return appUserRepository.findByUuid(uuid)
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
                appUserEntity.getUuid(),
                appUserEntity.getLoginId(),
                appUserEntity.getRole().name(),
                appUserEntity.getNickname(),
                appUserEntity.getDescription(),
                appUserEntity.getRegisteredAt(),
                null // imageUrl 선개발시 처리
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
                updateUser.getUuid(),
                updateUser.getLoginId(),
                updateUser.getRole().name(),
                updateUser.getNickname(),
                updateUser.getDescription(),
                updateUser.getRegisteredAt(),
                null // imageUrl 선개발시 처리
        );
    }

    // StageManager 들 조회
    public PageResponse<StageManagerResp> getStageManagers(CursorPagingReq pagingReq) {
        return stageManagerCursorRepository.findAll(pagingReq);
    }

    @Override
    public StageManagerResp getStageManagerDetail(UUID uuid) {
        AppUserEntity user = appUserRepository.findByUuid(uuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        return new StageManagerResp(
                user.getLoginId(),
                user.getRole().name(),
                user.getNickname(),
                user.getDescription(),
                null  // TODO : imageUrl 선개발시 null 처리
        );
    }

    @Override
    public PageResponse<MusicianResp> getMusicians(MusicianCursorPagingReq pagingReq) {
        // 필터 조건이 없으면 모든 뮤지션 목록을 조회
        BooleanExpression condition = QMusicianEntity.musicianEntity.isNotNull();

        // name 필터가 있는 경우
        if (pagingReq.getName() != null && !pagingReq.getName().isEmpty()) {
            condition = condition.and(QMusicianEntity.musicianEntity.name.containsIgnoreCase(pagingReq.getName()));
        }

        // 조건에 맞는 뮤지션 목록을 조회
        return musicianCursorRepository.findWithPagination(pagingReq, MusicianResp::from, condition);
    }

    @Override
    public MusicianResp getMusicianDetail(UUID uuid) {
        MusicianEntity musician = musicianRepository.findByUuid(uuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        return MusicianResp.from(musician);
    }
}