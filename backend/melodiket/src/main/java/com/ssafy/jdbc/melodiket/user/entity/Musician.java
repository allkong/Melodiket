package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusician;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcert;
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
public class Musician extends AppUser {
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private AppUser user;

    private String description;

    private String imageUrl;

    @OneToMany(mappedBy = "musician", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConcertParticipantMusician> concertParticipantMusicians = new ArrayList<>();

    @OneToMany(mappedBy = "musician", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteMusician> favoriteMusicians = new ArrayList<>();

}
