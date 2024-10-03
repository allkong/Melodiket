package com.ssafy.jdbc.melodiket.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMusicianEntity is a Querydsl query type for MusicianEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMusicianEntity extends EntityPathBase<MusicianEntity> {

    private static final long serialVersionUID = -2092761668L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMusicianEntity musicianEntity = new QMusicianEntity("musicianEntity");

    public final QAppUserEntity _super;

    //inherited
    public final ListPath<com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountCertificationEntity> accountCertifications;

    //inherited
    public final ListPath<com.ssafy.jdbc.melodiket.account.entity.AccountEntity, com.ssafy.jdbc.melodiket.account.entity.QAccountEntity> accounts;

    public final ListPath<com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity, com.ssafy.jdbc.melodiket.concert.entity.QConcertParticipantMusicianEntity> concertParticipantMusicians = this.<com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity, com.ssafy.jdbc.melodiket.concert.entity.QConcertParticipantMusicianEntity>createList("concertParticipantMusicians", com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity.class, com.ssafy.jdbc.melodiket.concert.entity.QConcertParticipantMusicianEntity.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt;

    //inherited
    public final StringPath description;

    public final ListPath<com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteMusicianEntity> favoriteMusicians = this.<com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteMusicianEntity>createList("favoriteMusicians", com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity.class, com.ssafy.jdbc.melodiket.user.entity.favorite.QFavoriteMusicianEntity.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> id;

    public final StringPath imageUrl = createString("imageUrl");

    public final NumberPath<Integer> likeCount = createNumber("likeCount", Integer.class);

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

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt;

    //inherited
    public final ComparablePath<java.util.UUID> uuid;

    // inherited
    public final com.ssafy.jdbc.melodiket.wallet.entity.QWalletInfoEntity walletInfo;

    public QMusicianEntity(String variable) {
        this(MusicianEntity.class, forVariable(variable), INITS);
    }

    public QMusicianEntity(Path<? extends MusicianEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMusicianEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMusicianEntity(PathMetadata metadata, PathInits inits) {
        this(MusicianEntity.class, metadata, inits);
    }

    public QMusicianEntity(Class<? extends MusicianEntity> type, PathMetadata metadata, PathInits inits) {
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

