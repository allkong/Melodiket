package com.ssafy.jdbc.melodiket.user.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageInfoCursor;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteMusicianEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class FavoriteMusicianCursorRepository {
    private final QFavoriteMusicianEntity qFavoriteMusicianEntity = QFavoriteMusicianEntity.favoriteMusicianEntity;
    private final JPAQueryFactory jpaQueryFactory;

    public PageResponse<MusicianResp> findByLikedAudience(AudienceEntity audienceEntity, CursorPagingReq pagingReq) {
        BooleanExpression condition = qFavoriteMusicianEntity.audienceEntity.eq(audienceEntity);
        if (!pagingReq.isFirstPage() && pagingReq.getLastUuid() != null) {
            condition = condition.and(qFavoriteMusicianEntity.musicianEntity.uuid.gt(pagingReq.getLastUuid()));
        }
        List<MusicianEntity> entities = jpaQueryFactory.select(qFavoriteMusicianEntity.musicianEntity)
                .from(qFavoriteMusicianEntity)
                .where(condition)
                .orderBy(qFavoriteMusicianEntity.musicianEntity.uuid.asc())
                .limit(pagingReq.getPageSize() + 1L)
                .fetch();

        boolean hasNextPage = entities.size() > pagingReq.getPageSize();
        PageInfoCursor pageInfoCursor = new PageInfoCursor(
                hasNextPage,
                pagingReq.getPageSize(),
                hasNextPage ? entities.size() - 1 : entities.size(),
                entities.isEmpty() ? null : entities.get(entities.size() - 1).getUuid()
        );

        List<MusicianResp> musicianResp = entities.subList(0, Math.min(entities.size(), pagingReq.getPageSize())).stream()
                .map(MusicianResp::from)
                .toList();

        return new PageResponse<>(pageInfoCursor, musicianResp);
    }
}
