package com.ssafy.jdbc.melodiket.photocard.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhotoCardEntity is a Querydsl query type for PhotoCardEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhotoCardEntity extends EntityPathBase<PhotoCardEntity> {

    private static final long serialVersionUID = -1132002650L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPhotoCardEntity photoCardEntity = new QPhotoCardEntity("photoCardEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QExposableEntity _super = new com.ssafy.jdbc.melodiket.common.base.QExposableEntity(this);

    public final StringPath address = createString("address");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath imageCid = createString("imageCid");

    public final com.ssafy.jdbc.melodiket.ticket.entity.QTicketEntity ticketEntity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid = _super.uuid;

    public QPhotoCardEntity(String variable) {
        this(PhotoCardEntity.class, forVariable(variable), INITS);
    }

    public QPhotoCardEntity(Path<? extends PhotoCardEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPhotoCardEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPhotoCardEntity(PathMetadata metadata, PathInits inits) {
        this(PhotoCardEntity.class, metadata, inits);
    }

    public QPhotoCardEntity(Class<? extends PhotoCardEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ticketEntity = inits.isInitialized("ticketEntity") ? new com.ssafy.jdbc.melodiket.ticket.entity.QTicketEntity(forProperty("ticketEntity"), inits.get("ticketEntity")) : null;
    }

}

