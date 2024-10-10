package com.ssafy.jdbc.melodiket.concert.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QConcertSeatEntity is a Querydsl query type for ConcertSeatEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QConcertSeatEntity extends EntityPathBase<ConcertSeatEntity> {

    private static final long serialVersionUID = -872376533L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QConcertSeatEntity concertSeatEntity = new QConcertSeatEntity("concertSeatEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QBaseEntity _super = new com.ssafy.jdbc.melodiket.common.base.QBaseEntity(this);

    public final QConcertEntity concertEntity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> seatCol = createNumber("seatCol", Long.class);

    public final NumberPath<Long> seatRow = createNumber("seatRow", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QConcertSeatEntity(String variable) {
        this(ConcertSeatEntity.class, forVariable(variable), INITS);
    }

    public QConcertSeatEntity(Path<? extends ConcertSeatEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QConcertSeatEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QConcertSeatEntity(PathMetadata metadata, PathInits inits) {
        this(ConcertSeatEntity.class, metadata, inits);
    }

    public QConcertSeatEntity(Class<? extends ConcertSeatEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.concertEntity = inits.isInitialized("concertEntity") ? new QConcertEntity(forProperty("concertEntity"), inits.get("concertEntity")) : null;
    }

}

