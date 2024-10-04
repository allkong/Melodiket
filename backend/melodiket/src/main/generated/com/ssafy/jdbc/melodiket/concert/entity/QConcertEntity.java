package com.ssafy.jdbc.melodiket.concert.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QConcertEntity is a Querydsl query type for ConcertEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QConcertEntity extends EntityPathBase<ConcertEntity> {

    private static final long serialVersionUID = -843899322L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QConcertEntity concertEntity = new QConcertEntity("concertEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QExposableEntity _super = new com.ssafy.jdbc.melodiket.common.base.QExposableEntity(this);

    public final NumberPath<Long> availableTickets = createNumber("availableTickets", Long.class);

    public final ListPath<ConcertParticipantMusicianEntity, QConcertParticipantMusicianEntity> concertParticipantMusicians = this.<ConcertParticipantMusicianEntity, QConcertParticipantMusicianEntity>createList("concertParticipantMusicians", ConcertParticipantMusicianEntity.class, QConcertParticipantMusicianEntity.class, PathInits.DIRECT2);

    public final SetPath<ConcertSeatEntity, QConcertSeatEntity> concertSeats = this.<ConcertSeatEntity, QConcertSeatEntity>createSet("concertSeats", ConcertSeatEntity.class, QConcertSeatEntity.class, PathInits.DIRECT2);

    public final EnumPath<ConcertStatus> concertStatus = createEnum("concertStatus", ConcertStatus.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath description = createString("description");

    public final ListPath<com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteConcertEntity> favoriteConcerts = this.<com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteConcertEntity>createList("favoriteConcerts", com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity.class, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteConcertEntity.class, PathInits.DIRECT2);

    public final NumberPath<Long> favoriteMusicianStake = createNumber("favoriteMusicianStake", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> musicianStake = createNumber("musicianStake", Long.class);

    public final com.ssafy.jdbc.melodiket.user.entity.QStageManagerEntity owner;

    public final NumberPath<Long> ownerStake = createNumber("ownerStake", Long.class);

    public final StringPath posterCid = createString("posterCid");

    public final com.ssafy.jdbc.melodiket.stage.entity.QStageEntity stageEntity;

    public final DateTimePath<java.time.LocalDateTime> startAt = createDateTime("startAt", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> ticketingAt = createDateTime("ticketingAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> ticketPrice = createNumber("ticketPrice", Long.class);

    public final ListPath<com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity, com.ssafy.jdbc.melodiket.ticket.entity.QTicketEntity> tickets = this.<com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity, com.ssafy.jdbc.melodiket.ticket.entity.QTicketEntity>createList("tickets", com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity.class, com.ssafy.jdbc.melodiket.ticket.entity.QTicketEntity.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final ComparablePath<java.util.UUID> uuid = createComparable("uuid", java.util.UUID.class);

    public QConcertEntity(String variable) {
        this(ConcertEntity.class, forVariable(variable), INITS);
    }

    public QConcertEntity(Path<? extends ConcertEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QConcertEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QConcertEntity(PathMetadata metadata, PathInits inits) {
        this(ConcertEntity.class, metadata, inits);
    }

    public QConcertEntity(Class<? extends ConcertEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.owner = inits.isInitialized("owner") ? new com.ssafy.jdbc.melodiket.user.entity.QStageManagerEntity(forProperty("owner"), inits.get("owner")) : null;
        this.stageEntity = inits.isInitialized("stageEntity") ? new com.ssafy.jdbc.melodiket.stage.entity.QStageEntity(forProperty("stageEntity"), inits.get("stageEntity")) : null;
    }

}

