package com.ssafy.jdbc.melodiket.concert.entity;

import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "concert")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ConcertEntity extends ExposableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private UUID uuid;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id", nullable = false)
    private StageEntity stageEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id", nullable = false)
    private StageManagerEntity owner;

    @Column(nullable = false)
    private LocalDateTime startAt;

    @Column(nullable = false)
    private LocalDateTime ticketingAt;

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

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ConcertStatus concertStatus;

    @Builder.Default
    @OneToMany(mappedBy = "concertEntity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<TicketEntity> tickets = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "concertEntity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ConcertParticipantMusicianEntity> concertParticipantMusicians = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "concertEntity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<FavoriteConcertEntity> favoriteConcerts = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "concertEntity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<ConcertSeatEntity> concertSeats = new HashSet<>();

    public void cancel() {
        this.concertStatus = ConcertStatus.CANCELED;
    }

    public void active() {
        this.concertStatus = ConcertStatus.ACTIVE;
    }
}