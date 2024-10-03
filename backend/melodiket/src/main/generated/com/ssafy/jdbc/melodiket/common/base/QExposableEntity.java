package com.ssafy.jdbc.melodiket.common.base;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QExposableEntity is a Querydsl query type for ExposableEntity
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QExposableEntity extends EntityPathBase<ExposableEntity> {

    private static final long serialVersionUID = -1369232508L;

    public static final QExposableEntity exposableEntity = new QExposableEntity("exposableEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final ComparablePath<java.util.UUID> uuid = createComparable("uuid", java.util.UUID.class);

    public QExposableEntity(String variable) {
        super(ExposableEntity.class, forVariable(variable));
    }

    public QExposableEntity(Path<? extends ExposableEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QExposableEntity(PathMetadata metadata) {
        super(ExposableEntity.class, metadata);
    }

}

