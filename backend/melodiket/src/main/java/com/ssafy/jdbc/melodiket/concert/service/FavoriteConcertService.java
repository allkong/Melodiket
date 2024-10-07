package com.ssafy.jdbc.melodiket.concert.service;

import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.concert.controller.dto.FavoriteConcertResp;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.concert.repository.FavoriteConcertRepository;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity;
import com.ssafy.jdbc.melodiket.user.repository.AudienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FavoriteConcertService {

    private final ConcertRepository concertRepository;
    private final FavoriteConcertRepository favoriteConcertRepository;
    private final AudienceRepository audienceRepository;

    @Transactional
    public FavoriteConcertResp toggleFavoriteConcert(UUID concertId, String loginId) {

        // 공연 존재 여부 확인
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        // 관객 존재 여부 확인
        AudienceEntity audience = audienceRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        // 이미 찜한 상태인지 확인
        Optional<FavoriteConcertEntity> existingFavorite = favoriteConcertRepository
                .findByAudienceEntityAndConcertEntity(audience, concert);

        boolean isFavorite;
        if (existingFavorite.isPresent()) {
            favoriteConcertRepository.delete(existingFavorite.get());
            isFavorite = false;
        } else {
            FavoriteConcertEntity favoriteConcert = FavoriteConcertEntity.builder()
                    .audienceEntity(audience)
                    .concertEntity(concert)
                    .build();
            favoriteConcertRepository.save(favoriteConcert);
            isFavorite = true;
        }

        return new FavoriteConcertResp(audience.getUuid(), concert.getUuid(), isFavorite);
    }
}
