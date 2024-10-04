package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity;
import jakarta.persistence.*;
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


    private String imageUrl;

    @Column(nullable = false)
    private int likeCount = 0;

    @OneToMany(mappedBy = "musicianEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConcertParticipantMusicianEntity> concertParticipantMusicians = new ArrayList<>();

    @OneToMany(mappedBy = "musicianEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteMusicianEntity> favoriteMusicians = new ArrayList<>();

    public MusicianEntity(String description, String imageUrl, List<ConcertParticipantMusicianEntity> concertParticipantMusicians, List<FavoriteMusicianEntity> favoriteMusicians, int likeCount) {
        this.likeCount = likeCount;
        this.imageUrl = imageUrl;
        this.concertParticipantMusicians = concertParticipantMusicians != null ? concertParticipantMusicians : new ArrayList<>();
        this.favoriteMusicians = favoriteMusicians != null ? favoriteMusicians : new ArrayList<>();
    }

    public void incrementLikeCount() {
        this.likeCount++;
    }

    public void decrementLikeCount() {
        this.likeCount--;
    }
}
