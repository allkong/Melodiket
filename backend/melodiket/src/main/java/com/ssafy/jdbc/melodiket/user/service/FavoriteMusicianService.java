package com.ssafy.jdbc.melodiket.user.service;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity;
import com.ssafy.jdbc.melodiket.user.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@RequiredArgsConstructor
public class FavoriteMusicianService implements FavoriteService {

    private final FavoriteMusicianRepository favoriteMusicianRepository;
    private final AppUserRepository appUserRepository;
    private final AudienceRepository audienceRepository;
    private final MusicianRepository musicianRepository;
    private final FavoriteMusicianCursorRepository favoriteMusicianCursorRepository;

    @Transactional
    public boolean toggleLikeMusician(UUID audienceId, UUID musicianId) {

        AudienceEntity audience = audienceRepository.findByUuid(audienceId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

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
    public PageResponse<MusicianResp> findLikedMusiciansByAudience(UUID audienceId, CursorPagingReq pagingReq) {
        AudienceEntity audience = audienceRepository.findByUuid(audienceId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        PageResponse pageResponse = favoriteMusicianCursorRepository.findByLikedAudience(audience, pagingReq);
        return pageResponse;
    }
}