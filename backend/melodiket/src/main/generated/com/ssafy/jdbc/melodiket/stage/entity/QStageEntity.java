package com.ssafy.jdbc.melodiket.stage.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStageEntity is a Querydsl query type for StageEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStageEntity extends EntityPathBase<StageEntity> {

    private static final long serialVersionUID = -456671098L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStageEntity stageEntity = new QStageEntity("stageEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QExposableEntity _super = new com.ssafy.jdbc.melodiket.common.base.QExposableEntity(this);

    public final StringPath address = createString("address");

    public final NumberPath<Long> capacity = createNumber("capacity", Long.class);

    public final ListPath<com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity, com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity> concerts = this.<com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity, com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity>createList("concerts", com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity.class, com.ssafy.jdbc.melodiket.concert.entity.QConcertEntity.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final BooleanPath isStanding = createBoolean("isStanding");

    public final StringPath name = createString("name");

    public final NumberPath<Long> numOfCol = createNumber("numOfCol", Long.class);

    public final NumberPath<Long> numOfRow = createNumber("numOfRow", Long.class);

    public final com.ssafy.jdbc.melodiket.user.entity.QStageManagerEntity owner;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid = _super.uuid;

    public QStageEntity(String variable) {
        this(StageEntity.class, forVariable(variable), INITS);
    }

    public QStageEntity(Path<? extends StageEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStageEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStageEntity(PathMetadata metadata, PathInits inits) {
        this(StageEntity.class, metadata, inits);
    }

    public QStageEntity(Class<? extends StageEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.owner = inits.isInitialized("owner") ? new com.ssafy.jdbc.melodiket.user.entity.QStageManagerEntity(forProperty("owner"), inits.get("owner")) : null;
    }

}

