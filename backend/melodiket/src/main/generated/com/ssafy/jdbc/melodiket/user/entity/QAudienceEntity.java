package com.ssafy.jdbc.melodiket.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAudienceEntity is a Querydsl query type for AudienceEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAudienceEntity extends EntityPathBase<AudienceEntity> {

    private static final long serialVersionUID = 990391151L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAudienceEntity audienceEntity = new QAudienceEntity("audienceEntity");

    public final QAppUserEntity _super;

    //inherited
    public final ListPath<com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountCertificationEntity> accountCertifications;

    //inherited
    public final ListPath<com.ssafy.jdbc.melodiket.account.entity.AccountEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountEntity> accounts;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt;

    //inherited
    public final StringPath description;

    public final ListPath<com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteConcertEntity> favoriteConcerts = this.<com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteConcertEntity>createList("favoriteConcerts", com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity.class, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteConcertEntity.class, PathInits.DIRECT2);

    public final ListPath<com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteMusicianEntity> favoriteMusicians = this.<com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteMusicianEntity>createList("favoriteMusicians", com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity.class, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteMusicianEntity.class, PathInits.DIRECT2);

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

    public final ListPath<com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity, com.ssafy.jdbc.melodiket.ticket.entity.QTicketEntity> tickets = this.<com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity, com.ssafy.jdbc.melodiket.ticket.entity.QTicketEntity>createList("tickets", com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity.class, com.ssafy.jdbc.melodiket.ticket.entity.QTicketEntity.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid;

    // inherited
    public final com.ssafy.jdbc.melodiket.wallet.entity.QWalletInfoEntity walletInfo;

    public QAudienceEntity(String variable) {
        this(AudienceEntity.class, forVariable(variable), INITS);
    }

    public QAudienceEntity(Path<? extends AudienceEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAudienceEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAudienceEntity(PathMetadata metadata, PathInits inits) {
        this(AudienceEntity.class, metadata, inits);
    }

    public QAudienceEntity(Class<? extends AudienceEntity> type, PathMetadata metadata, PathInits inits) {
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

