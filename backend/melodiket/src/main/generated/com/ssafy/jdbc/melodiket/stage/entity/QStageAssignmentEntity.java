package com.ssafy.jdbc.melodiket.stage.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStageAssignmentEntity is a Querydsl query type for StageAssignmentEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStageAssignmentEntity extends EntityPathBase<StageAssignmentEntity> {

    private static final long serialVersionUID = 1987311091L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStageAssignmentEntity stageAssignmentEntity = new QStageAssignmentEntity("stageAssignmentEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QBaseEntity _super = new com.ssafy.jdbc.melodiket.common.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QStageEntity stageEntity;

    public final com.ssafy.jdbc.melodiket.user.entity.QStageManagerEntity stageManagerEntity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QStageAssignmentEntity(String variable) {
        this(StageAssignmentEntity.class, forVariable(variable), INITS);
    }

    public QStageAssignmentEntity(Path<? extends StageAssignmentEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStageAssignmentEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStageAssignmentEntity(PathMetadata metadata, PathInits inits) {
        this(StageAssignmentEntity.class, metadata, inits);
    }

    public QStageAssignmentEntity(Class<? extends StageAssignmentEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.stageEntity = inits.isInitialized("stageEntity") ? new QStageEntity(forProperty("stageEntity")) : null;
        this.stageManagerEntity = inits.isInitialized("stageManagerEntity") ? new com.ssafy.jdbc.melodiket.user.entity.QStageManagerEntity(forProperty("stageManagerEntity")) : null;
    }

}

