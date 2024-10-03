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

    public final ListPath<StageAssignmentEntity, QStageAssignmentEntity> stageAssignmentEntities = this.<StageAssignmentEntity, QStageAssignmentEntity>createList("stageAssignmentEntities", StageAssignmentEntity.class, QStageAssignmentEntity.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid = _super.uuid;

    public QStageEntity(String variable) {
        super(StageEntity.class, forVariable(variable));
    }

    public QStageEntity(Path<? extends StageEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStageEntity(PathMetadata metadata) {
        super(StageEntity.class, metadata);
    }

}

