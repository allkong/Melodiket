package com.ssafy.jdbc.melodiket.ticket.entity;

import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "ticket")
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class TicketEntity extends ExposableEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "audience_id", nullable = false)
    private AudienceEntity audienceEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false)
    private ConcertEntity concertEntity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    private Long seatRow;
    private Long seatCol;
    private LocalDateTime usedAt;
    private LocalDateTime refundedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "favorite_musician_id")
    private MusicianEntity favoriteMusician;

    private String userName;

    public void updateStatusUsed() {
        this.status = Status.USED;
        this.usedAt = LocalDateTime.now();
    }

    public void updateStatusRefunded(Status status) {
        this.status = status;
        this.refundedAt = LocalDateTime.now();
    }
}
