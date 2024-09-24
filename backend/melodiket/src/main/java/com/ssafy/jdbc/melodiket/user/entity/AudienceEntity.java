package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcert;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusician;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "audience")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AudienceEntity extends AppUserEntity {
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private AppUserEntity user;

    private String description;

    private String imageUrl;

    @OneToMany(mappedBy = "audienceEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TicketEntity> tickets = new ArrayList<>();

    @OneToMany(mappedBy = "audienceEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteConcert> favoriteConcerts = new ArrayList<>();

    @OneToMany(mappedBy = "audienceEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteMusician> favoriteMusicians = new ArrayList<>();

}
