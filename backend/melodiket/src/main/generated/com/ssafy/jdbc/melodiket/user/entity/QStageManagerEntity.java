package com.ssafy.jdbc.melodiket.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStageManagerEntity is a Querydsl query type for StageManagerEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStageManagerEntity extends EntityPathBase<StageManagerEntity> {

    private static final long serialVersionUID = -1854082054L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStageManagerEntity stageManagerEntity = new QStageManagerEntity("stageManagerEntity");

    public final QAppUserEntity _super;

    //inherited
    public final ListPath<com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountCertificationEntity> accountCertifications;

    //inherited
    public final ListPath<com.ssafy.jdbc.melodiket.account.entity.AccountEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountEntity> accounts;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt;

    //inherited
    public final StringPath description;

    //inherited
    public final NumberPath<Long> id;

    public final StringPath imageUrl = createString("imageUrl");

    //inherited
    public final StringPath loginId;

    //inherited
    public final StringPath name;

    //inherited
    public final StringPath nickname;

    //inherited
    public final StringPath password;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> registeredAt;

    //inherited
    public final EnumPath<Role> role;

    //inherited
    public final StringPath salt;

    public final ListPath<com.ssafy.jdbc.melodiket.stage.entity.StageAssignmentEntity, com.ssafy.jdbc.melodiket.stage.entity.QStageAssignmentEntity> stageAssignmentEntities = this.<com.ssafy.jdbc.melodiket.stage.entity.StageAssignmentEntity, com.ssafy.jdbc.melodiket.stage.entity.QStageAssignmentEntity>createList("stageAssignmentEntities", com.ssafy.jdbc.melodiket.stage.entity.StageAssignmentEntity.class, com.ssafy.jdbc.melodiket.stage.entity.QStageAssignmentEntity.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid;

    // inherited
    public final com.ssafy.jdbc.melodiket.wallet.entity.QWalletInfoEntity walletInfo;

    public QStageManagerEntity(String variable) {
        this(StageManagerEntity.class, forVariable(variable), INITS);
    }

    public QStageManagerEntity(Path<? extends StageManagerEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStageManagerEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStageManagerEntity(PathMetadata metadata, PathInits inits) {
        this(StageManagerEntity.class, metadata, inits);
    }

    public QStageManagerEntity(Class<? extends StageManagerEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this._super = new QAppUserEntity(type, metadata, inits);
        this.accountCertifications = _super.accountCertifications;
        this.accounts = _super.accounts;
        this.createdAt = _super.createdAt;
        this.description = _super.description;
        this.id = _super.id;
        this.loginId = _super.loginId;
        this.name = _super.name;
        this.nickname = _super.nickname;
        this.password = _super.password;
        this.registeredAt = _super.registeredAt;
        this.role = _super.role;
        this.salt = _super.salt;
        this.updatedAt = _super.updatedAt;
        this.uuid = _super.uuid;
        this.walletInfo = _super.walletInfo;
    }

}

