package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusician;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteMusicianRepository extends JpaRepository<FavoriteMusician, Long> {

    boolean existsByAudienceEntityAndMusicianEntity(AppUserEntity audience, AppUserEntity musician);

    void deleteByAudienceEntityAndMusicianEntity(AppUserEntity audience, AppUserEntity musician);

    Page<FavoriteMusician> findByAudienceEntity(AppUserEntity audience, Pageable pageable);
}