package com.ssafy.jdbc.melodiket.ticket.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTicketEntity is a Querydsl query type for TicketEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTicketEntity extends EntityPathBase<TicketEntity> {

    private static final long serialVersionUID = 416998712L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTicketEntity ticketEntity = new QTicketEntity("ticketEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QExposableEntity _super = new com.ssafy.jdbc.melodiket.common.base.QExposableEntity(this);

    public final com.ssafy.jdbc.melodiket.user.entity.QAudienceEntity audienceEntity;

    public final com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity concertEntity;

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> favoriteMusician = createNumber("favoriteMusician", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> refundedAt = createDateTime("refundedAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> seatCol = createNumber("seatCol", Long.class);

    public final NumberPath<Long> seatRow = createNumber("seatRow", Long.class);

    public final EnumPath<Status> status = createEnum("status", Status.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final DateTimePath<java.time.LocalDateTime> usedAt = createDateTime("usedAt", java.time.LocalDateTime.class);

    public final StringPath userName = createString("userName");

    public final ComparablePath<java.util.UUID> uuid = createComparable("uuid", java.util.UUID.class);

    public QTicketEntity(String variable) {
        this(TicketEntity.class, forVariable(variable), INITS);
    }

    public QTicketEntity(Path<? extends TicketEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTicketEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTicketEntity(PathMetadata metadata, PathInits inits) {
        this(TicketEntity.class, metadata, inits);
    }

    public QTicketEntity(Class<? extends TicketEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.audienceEntity = inits.isInitialized("audienceEntity") ? new com.ssafy.jdbc.melodiket.user.entity.QAudienceEntity(forProperty("audienceEntity"), inits.get("audienceEntity")) : null;
        this.concertEntity = inits.isInitialized("concertEntity") ? new com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity(forProperty("concertEntity"), inits.get("concertEntity")) : null;
    }

}

