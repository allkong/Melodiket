package com.ssafy.jdbc.melodiket.concert.entity;

import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "concert")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ConcertEntity extends ExposableEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id", nullable = false)
    private StageEntity stageEntity;

    @Column(nullable = false)
    private Date startAt;

    @Column(nullable = false)
    private Date ticketingAt;

    @Column(nullable = false)
    private Long availableTickets;

    private String description;

    @Column(nullable = false)
    private String posterCid;

    @Column(nullable = false)
    private Long ticketPrice;

    @Column(nullable = false)
    private Long ownerStake;

    @Column(nullable = false)
    private Long musicianStake;

    @Column(nullable = false)
    private Long favoriteMusicianStake;

    @OneToMany(mappedBy = "concertEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TicketEntity> tickets = new ArrayList<>();

    @OneToMany(mappedBy = "concertEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConcertParticipantMusicianEntity> concertParticipantMusicians = new ArrayList<>();

    @OneToMany(mappedBy = "concertEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteConcertEntity> favoriteConcerts = new ArrayList<>();
}
