package com.ssafy.jdbc.melodiket.user.service;

import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageInfo;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.Role;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity;
import com.ssafy.jdbc.melodiket.user.repository.AppUserRepository;
import com.ssafy.jdbc.melodiket.user.repository.FavoriteMusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class FavoriteMusicianService implements FavoriteService {

    private final FavoriteMusicianRepository favoriteMusicianRepository;
    private final AppUserRepository appUserRepository;
    private final MusicianRepository musicianRepository;

    @Transactional
    public boolean toggleLikeMusician(UUID audienceId, UUID musicianId) {

        AppUserEntity audience = appUserRepository.findByUuid(audienceId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        // Role 확인
        if (audience.getRole() != Role.AUDIENCE) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE);
        }

        MusicianEntity musician = musicianRepository.findByUuid(musicianId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        // 찜 여부 따라 처리
        if (favoriteMusicianRepository.existsByAudienceEntityAndMusicianEntity(audience, musician)) {
            favoriteMusicianRepository.deleteByAudienceEntityAndMusicianEntity(audience, musician);

            musician.decrementLikeCount();
            return false;
        } else {
            FavoriteMusicianEntity favoriteMusician = FavoriteMusicianEntity.builder()
                    .audienceEntity(audience)
                    .musicianEntity(musician)
                    .build();
            favoriteMusicianRepository.save(favoriteMusician);

            musician.incrementLikeCount();
            return true;
        }
    }

    @Override
    public PageResponse<UserProfileResp> findLikedMusiciansByAudience(UUID audienceId, Pageable pageable) {

        AppUserEntity audience = appUserRepository.findByUuid(audienceId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        if (audience.getRole() != Role.AUDIENCE) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE); // E403001
        }

        Page<FavoriteMusician> favoriteMusicians = favoriteMusicianRepository.findByAudienceEntity(audience, pageable);

        PageInfo pageInfo = new PageInfo(
                favoriteMusicians.hasNext(),
                favoriteMusicians.getNumber(),
                pageable.getPageSize(),
                favoriteMusicians.getNumberOfElements()
        );

        List<UserProfileResp> result = favoriteMusicians.getContent().stream()
                .map(favorite -> {
                    AppUserEntity musician = favorite.getMusicianEntity();
                    return new UserProfileResp(
                            musician.getLoginId(),
                            "MUSICIAN",
                            musician.getNickname(),
                            musician.getDescription(),
                            musician.getRegisteredAt(),
                            null,
                            null
                    );
                })
                .collect(Collectors.toList());

        // 최종 응답 반환
        return new PageResponse<>(pageInfo, result);
    }
}