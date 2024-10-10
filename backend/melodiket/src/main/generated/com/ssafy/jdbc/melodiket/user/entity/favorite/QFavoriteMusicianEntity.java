package com.ssafy.jdbc.melodiket.user.entity.favorite;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavoriteMusicianEntity is a Querydsl query type for FavoriteMusicianEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavoriteMusicianEntity extends EntityPathBase<FavoriteMusicianEntity> {

    private static final long serialVersionUID = -244757638L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavoriteMusicianEntity favoriteMusicianEntity = new QFavoriteMusicianEntity("favoriteMusicianEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QBaseEntity _super = new com.ssafy.jdbc.melodiket.common.base.QBaseEntity(this);

    public final com.ssafy.jdbc.melodiket.user.entity.QAudienceEntity audienceEntity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final com.ssafy.jdbc.melodiket.user.entity.QMusicianEntity musicianEntity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QFavoriteMusicianEntity(String variable) {
        this(FavoriteMusicianEntity.class, forVariable(variable), INITS);
    }

    public QFavoriteMusicianEntity(Path<? extends FavoriteMusicianEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavoriteMusicianEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavoriteMusicianEntity(PathMetadata metadata, PathInits inits) {
        this(FavoriteMusicianEntity.class, metadata, inits);
    }

    public QFavoriteMusicianEntity(Class<? extends FavoriteMusicianEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.audienceEntity = inits.isInitialized("audienceEntity") ? new com.ssafy.jdbc.melodiket.user.entity.QAudienceEntity(forProperty("audienceEntity"), inits.get("audienceEntity")) : null;
        this.musicianEntity = inits.isInitialized("musicianEntity") ? new com.ssafy.jdbc.melodiket.user.entity.QMusicianEntity(forProperty("musicianEntity"), inits.get("musicianEntity")) : null;
    }

}

