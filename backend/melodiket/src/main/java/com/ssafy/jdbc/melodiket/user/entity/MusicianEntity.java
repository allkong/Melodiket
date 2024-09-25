package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusician;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "musician")
@Getter
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
public class MusicianEntity extends AppUserEntity {

//    @OneToOne
//    @JoinColumn(name = "id", referencedColumnName = "id")
//    private AppUserEntity user;

    private String imageUrl;

    @OneToMany(mappedBy = "musicianEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConcertParticipantMusicianEntity> concertParticipantMusicians = new ArrayList<>();

    @OneToMany(mappedBy = "musicianEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteMusician> favoriteMusicians = new ArrayList<>();

    public MusicianEntity(String description, String imageUrl, List<ConcertParticipantMusicianEntity> concertParticipantMusicians, List<FavoriteMusician> favoriteMusicians) {
        this.imageUrl = imageUrl;
        this.concertParticipantMusicians = concertParticipantMusicians != null ? concertParticipantMusicians : new ArrayList<>();
        this.favoriteMusicians = favoriteMusicians != null ? favoriteMusicians : new ArrayList<>();
    }
}
