package com.ssafy.jdbc.melodiket.ticket.entity;

import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Entity
@Getter
@Table(name = "ticket")
@SuperBuilder
@NoArgsConstructor
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
    private Date usedAt;
    private Date refundedAt;
}
