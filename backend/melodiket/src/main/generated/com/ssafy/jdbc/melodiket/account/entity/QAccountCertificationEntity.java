package com.ssafy.jdbc.melodiket.account.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccountCertificationEntity is a Querydsl query type for AccountCertificationEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountCertificationEntity extends EntityPathBase<AccountCertificationEntity> {

    private static final long serialVersionUID = -1040237926L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccountCertificationEntity accountCertificationEntity = new QAccountCertificationEntity("accountCertificationEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QBaseEntity _super = new com.ssafy.jdbc.melodiket.common.base.QBaseEntity(this);

    public final com.ssafy.jdbc.melodiket.user.entity.QAppUserEntity appUserEntity;

    public final StringPath bankName = createString("bankName");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DateTimePath<java.util.Date> expiresAt = createDateTime("expiresAt", java.util.Date.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath number = createString("number");

    public final StringPath ownerName = createString("ownerName");

    public final StringPath secret = createString("secret");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QAccountCertificationEntity(String variable) {
        this(AccountCertificationEntity.class, forVariable(variable), INITS);
    }

    public QAccountCertificationEntity(Path<? extends AccountCertificationEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccountCertificationEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccountCertificationEntity(PathMetadata metadata, PathInits inits) {
        this(AccountCertificationEntity.class, metadata, inits);
    }

    public QAccountCertificationEntity(Class<? extends AccountCertificationEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.appUserEntity = inits.isInitialized("appUserEntity") ? new com.ssafy.jdbc.melodiket.user.entity.QAppUserEntity(forProperty("appUserEntity"), inits.get("appUserEntity")) : null;
    }

}

