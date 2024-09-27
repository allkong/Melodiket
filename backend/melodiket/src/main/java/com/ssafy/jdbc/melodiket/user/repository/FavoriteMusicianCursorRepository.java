package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity;
import org.springframework.stereotype.Repository;

@Repository
public class FavoriteMusicianCursorRepository extends BaseQueryRepository<FavoriteMusicianEntity, FavoriteMusician> {
}
