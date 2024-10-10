package com.ssafy.jdbc.melodiket.account.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccountEntity is a Querydsl query type for AccountEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountEntity extends EntityPathBase<AccountEntity> {

    private static final long serialVersionUID = 1787422566L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccountEntity accountEntity = new QAccountEntity("accountEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QExposableEntity _super = new com.ssafy.jdbc.melodiket.common.base.QExposableEntity(this);

    public final com.ssafy.jdbc.melodiket.user.entity.QAppUserEntity appUserEntity;

    public final StringPath bankName = createString("bankName");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath number = createString("number");

    public final StringPath ownerName = createString("ownerName");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid = _super.uuid;

    public QAccountEntity(String variable) {
        this(AccountEntity.class, forVariable(variable), INITS);
    }

    public QAccountEntity(Path<? extends AccountEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccountEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccountEntity(PathMetadata metadata, PathInits inits) {
        this(AccountEntity.class, metadata, inits);
    }

    public QAccountEntity(Class<? extends AccountEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.appUserEntity = inits.isInitialized("appUserEntity") ? new com.ssafy.jdbc.melodiket.user.entity.QAppUserEntity(forProperty("appUserEntity"), inits.get("appUserEntity")) : null;
    }

}

