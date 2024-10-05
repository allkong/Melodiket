package com.ssafy.jdbc.melodiket.concert.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QConcertParticipantMusicianEntity is a Querydsl query type for ConcertParticipantMusicianEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QConcertParticipantMusicianEntity extends EntityPathBase<ConcertParticipantMusicianEntity> {

    private static final long serialVersionUID = -893055964L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QConcertParticipantMusicianEntity concertParticipantMusicianEntity = new QConcertParticipantMusicianEntity("concertParticipantMusicianEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QBaseEntity _super = new com.ssafy.jdbc.melodiket.common.base.QBaseEntity(this);

    public final EnumPath<ApprovalStatus> approvalStatus = createEnum("approvalStatus", ApprovalStatus.class);

    public final QConcertEntity concertEntity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.jdbc.melodiket.user.entity.QMusicianEntity musicianEntity;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QConcertParticipantMusicianEntity(String variable) {
        this(ConcertParticipantMusicianEntity.class, forVariable(variable), INITS);
    }

    public QConcertParticipantMusicianEntity(Path<? extends ConcertParticipantMusicianEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QConcertParticipantMusicianEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QConcertParticipantMusicianEntity(PathMetadata metadata, PathInits inits) {
        this(ConcertParticipantMusicianEntity.class, metadata, inits);
    }

    public QConcertParticipantMusicianEntity(Class<? extends ConcertParticipantMusicianEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.concertEntity = inits.isInitialized("concertEntity") ? new QConcertEntity(forProperty("concertEntity"), inits.get("concertEntity")) : null;
        this.musicianEntity = inits.isInitialized("musicianEntity") ? new com.ssafy.jdbc.melodiket.user.entity.QMusicianEntity(forProperty("musicianEntity"), inits.get("musicianEntity")) : null;
    }

}

