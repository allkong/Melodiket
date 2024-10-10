package com.ssafy.jdbc.melodiket.wallet.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWalletInfoEntity is a Querydsl query type for WalletInfoEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWalletInfoEntity extends EntityPathBase<WalletInfoEntity> {

    private static final long serialVersionUID = -420323424L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWalletInfoEntity walletInfoEntity = new QWalletInfoEntity("walletInfoEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QBaseEntity _super = new com.ssafy.jdbc.melodiket.common.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath privateKey = createString("privateKey");

    public final StringPath publicKey = createString("publicKey");

    public final NumberPath<Long> tokenAmount = createNumber("tokenAmount", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.ssafy.jdbc.melodiket.user.entity.QAppUserEntity user;

    public final StringPath walletAddress = createString("walletAddress");

    public QWalletInfoEntity(String variable) {
        this(WalletInfoEntity.class, forVariable(variable), INITS);
    }

    public QWalletInfoEntity(Path<? extends WalletInfoEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWalletInfoEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWalletInfoEntity(PathMetadata metadata, PathInits inits) {
        this(WalletInfoEntity.class, metadata, inits);
    }

    public QWalletInfoEntity(Class<? extends WalletInfoEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ssafy.jdbc.melodiket.user.entity.QAppUserEntity(forProperty("user"), inits.get("user")) : null;
    }

}

