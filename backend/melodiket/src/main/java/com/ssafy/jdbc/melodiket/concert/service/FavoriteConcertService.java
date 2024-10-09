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

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteConcertService {

    private final ConcertRepository concertRepository;
    private final FavoriteConcertRepository favoriteConcertRepository;
    private final AudienceRepository audienceRepository;

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
            // 찜 해제
            FavoriteConcertEntity favorite = existingFavorite.get();

            // 연관 관계에서 해당 엔티티를 제거
            concert.getFavoriteConcerts().removeIf(fav -> fav.getId().equals(favorite.getId()));

            // DB에서 엔티티 삭제
            favoriteConcertRepository.delete(favorite);

            // Hibernate의 EntityManager를 통한 상태 동기화 및 삭제 처리
            favoriteConcertRepository.flush();  // 즉시 데이터베이스에 반영

            // 좋아요 수 감소
            concert.decrementLikeCount();
            concertRepository.saveAndFlush(concert);  // 변경 사항 저장 및 즉시 반영
            isFavorite = false;
        } else {
            // 찜 추가
            FavoriteConcertEntity favoriteConcert = FavoriteConcertEntity.builder()
                    .audienceEntity(audience)
                    .concertEntity(concert)
                    .build();

            concert.getFavoriteConcerts().add(favoriteConcert);

            // DB에 엔티티 저장
            favoriteConcertRepository.saveAndFlush(favoriteConcert);
            // 좋아요 수 증가
            concert.incrementLikeCount();
            concertRepository.saveAndFlush(concert);
            isFavorite = true;
        }

        return new FavoriteConcertResp(audience.getUuid(), concert.getUuid(), isFavorite, concert.getLikeCount());
    }


    public List<FavoriteConcertResp> getLikedConcerts(UUID audienceUuid) {
        AudienceEntity audience = audienceRepository.findByUuid(audienceUuid)
                .orElseThrow(() -> new IllegalArgumentException("Audience not found"));

        List<FavoriteConcertEntity> favoriteConcerts = favoriteConcertRepository.findAllByAudienceEntity(audience);

        return favoriteConcerts.stream()
                .map(favorite -> new FavoriteConcertResp(
                        favorite.getAudienceEntity().getUuid(),
                        favorite.getConcertEntity().getUuid(),
                        true,
                        favorite.getConcertEntity().getLikeCount()
                ))
                .collect(Collectors.toList());
    }
}
