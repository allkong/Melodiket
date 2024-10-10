package com.ssafy.jdbc.melodiket.user.entity.favorite;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavoriteConcertEntity is a Querydsl query type for FavoriteConcertEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavoriteConcertEntity extends EntityPathBase<FavoriteConcertEntity> {

    private static final long serialVersionUID = -66058429L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavoriteConcertEntity favoriteConcertEntity = new QFavoriteConcertEntity("favoriteConcertEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QBaseEntity _super = new com.ssafy.jdbc.melodiket.common.base.QBaseEntity(this);

    public final com.ssafy.jdbc.melodiket.user.entity.QAudienceEntity audienceEntity;

    public final com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity concertEntity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QFavoriteConcertEntity(String variable) {
        this(FavoriteConcertEntity.class, forVariable(variable), INITS);
    }

    public QFavoriteConcertEntity(Path<? extends FavoriteConcertEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavoriteConcertEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavoriteConcertEntity(PathMetadata metadata, PathInits inits) {
        this(FavoriteConcertEntity.class, metadata, inits);
    }

    public QFavoriteConcertEntity(Class<? extends FavoriteConcertEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.audienceEntity = inits.isInitialized("audienceEntity") ? new com.ssafy.jdbc.melodiket.user.entity.QAudienceEntity(forProperty("audienceEntity"), inits.get("audienceEntity")) : null;
        this.concertEntity = inits.isInitialized("concertEntity") ? new com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity(forProperty("concertEntity"), inits.get("concertEntity")) : null;
    }

}

