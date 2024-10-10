package com.ssafy.jdbc.melodiket.token.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTokenTransactionLogEntity is a Querydsl query type for TokenTransactionLogEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTokenTransactionLogEntity extends EntityPathBase<TokenTransactionLogEntity> {

    private static final long serialVersionUID = 1061083724L;

    public static final QTokenTransactionLogEntity tokenTransactionLogEntity = new QTokenTransactionLogEntity("tokenTransactionLogEntity");

    public final com.ssafy.jdbc.melodiket.common.base.QExposableEntity _super = new com.ssafy.jdbc.melodiket.common.base.QExposableEntity(this);

    public final NumberPath<Long> amount = createNumber("amount", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath fromIdentifier = createString("fromIdentifier");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final EnumPath<com.ssafy.jdbc.melodiket.account.service.AccountService.LogType> logType = createEnum("logType", com.ssafy.jdbc.melodiket.account.service.AccountService.LogType.class);

    public final StringPath toIdentifier = createString("toIdentifier");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid = _super.uuid;

    public QTokenTransactionLogEntity(String variable) {
        super(TokenTransactionLogEntity.class, forVariable(variable));
    }

    public QTokenTransactionLogEntity(Path<? extends TokenTransactionLogEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTokenTransactionLogEntity(PathMetadata metadata) {
        super(TokenTransactionLogEntity.class, metadata);
    }

}

