package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusician;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "musician")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MusicianEntity extends AppUserEntity {
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private AppUserEntity user;

    private String description;

    private String imageUrl;

    @OneToMany(mappedBy = "musicianEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConcertParticipantMusicianEntity> concertParticipantMusicians = new ArrayList<>();

    @OneToMany(mappedBy = "musicianEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteMusician> favoriteMusicians = new ArrayList<>();

}
