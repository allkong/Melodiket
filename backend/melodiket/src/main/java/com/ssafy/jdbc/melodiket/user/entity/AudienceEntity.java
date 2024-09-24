package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcert;
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
@Table(name = "audience")
@Getter
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
public class AudienceEntity extends AppUserEntity {

//    @OneToOne
//    @JoinColumn(name = "id", referencedColumnName = "id")
//    private AppUserEntity user;

    private String description;

    private String imageUrl;

    @OneToMany(mappedBy = "audienceEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TicketEntity> tickets = new ArrayList<>();

    @OneToMany(mappedBy = "audienceEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteConcert> favoriteConcerts = new ArrayList<>();

    @OneToMany(mappedBy = "audienceEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteMusician> favoriteMusicians = new ArrayList<>();

    public AudienceEntity(String description, String imageUrl, List<TicketEntity> tickets, List<FavoriteConcert> favoriteConcerts, List<FavoriteMusician> favoriteMusicians) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.tickets = tickets;
        this.favoriteConcerts = favoriteConcerts;
        this.favoriteMusicians = favoriteMusicians;
    }
}
