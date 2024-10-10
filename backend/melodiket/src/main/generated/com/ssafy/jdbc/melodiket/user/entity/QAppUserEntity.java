package com.ssafy.jdbc.melodiket.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAppUserEntity is a Querydsl query type for AppUserEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAppUserEntity extends EntityPathBase<AppUserEntity> {

    private static final long serialVersionUID = 719922983L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAppUserEntity appUserEntity = new QAppUserEntity("appUserEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QExposableEntity _super = new com.ssafy.jdbc.melodiket.common.base.QExposableEntity(this);

    public final ListPath<com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountCertificationEntity> accountCertifications = this.<com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountCertificationEntity>createList("accountCertifications", com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity.class, com.ssafy.jdbc.melodiket.account.entity.QAccountCertificationEntity.class, PathInits.DIRECT2);

    public final ListPath<com.ssafy.jdbc.melodiket.account.entity.AccountEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountEntity> accounts = this.<com.ssafy.jdbc.melodiket.account.entity.AccountEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountEntity>createList("accounts", com.ssafy.jdbc.melodiket.account.entity.AccountEntity.class, com.ssafy.jdbc.melodiket.account.entity.QAccountEntity.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath description = createString("description");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath loginId = createString("loginId");

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final DateTimePath<java.time.LocalDateTime> registeredAt = createDateTime("registeredAt", java.time.LocalDateTime.class);

    public final EnumPath<Role> role = createEnum("role", Role.class);

    public final StringPath salt = createString("salt");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid = _super.uuid;

    public final com.ssafy.jdbc.melodiket.wallet.entity.QWalletInfoEntity walletInfo;

    public QAppUserEntity(String variable) {
        this(AppUserEntity.class, forVariable(variable), INITS);
    }

    public QAppUserEntity(Path<? extends AppUserEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAppUserEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAppUserEntity(PathMetadata metadata, PathInits inits) {
        this(AppUserEntity.class, metadata, inits);
    }

    public QAppUserEntity(Class<? extends AppUserEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.walletInfo = inits.isInitialized("walletInfo") ? new com.ssafy.jdbc.melodiket.wallet.entity.QWalletInfoEntity(forProperty("walletInfo"), inits.get("walletInfo")) : null;
    }

}

