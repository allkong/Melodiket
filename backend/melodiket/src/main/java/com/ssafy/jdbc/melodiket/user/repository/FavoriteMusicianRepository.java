package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteMusicianRepository extends JpaRepository<FavoriteMusicianEntity, Long> {
    boolean existsByAudienceEntityAndMusicianEntity(AudienceEntity audience, MusicianEntity musician);

    void deleteByAudienceEntityAndMusicianEntity(AudienceEntity audience, MusicianEntity musician);
}
