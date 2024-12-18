package com.ssafy.jdbc.melodiket.concert.repository;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteConcertRepository extends JpaRepository<FavoriteConcertEntity, Long> {
    // 특정 공연에 대해 해당 사용자가 찜했는지 여부 확인
    Optional<FavoriteConcertEntity> findByAudienceEntityAndConcertEntity(AudienceEntity audienceEntity, ConcertEntity concertEntity);

    // 특정 공연에 대한 찜 기록 삭제
    void deleteByAudienceEntityAndConcertEntity(AudienceEntity audienceEntity, ConcertEntity concertEntity);

    // 찜 여부 확인
    boolean existsByAudienceEntityAndConcertEntity(AudienceEntity audienceEntity, ConcertEntity concertEntity);

    List<FavoriteConcertEntity> findAllByAudienceEntity(AudienceEntity audienceEntity);
}
