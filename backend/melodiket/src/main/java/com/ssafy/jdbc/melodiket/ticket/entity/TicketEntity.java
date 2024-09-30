package com.ssafy.jdbc.melodiket.ticket.entity;

import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Table(name = "ticket")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private UUID uuid;

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

    private Long favoriteMusician;

    public void updateStatusUsed(Status status){
        this.status = status;
        this.usedAt = LocalDateTime.now();
    }

    public void updateStatusRefunded(Status status){
        this.status = status;
        this.refundedAt = LocalDateTime.now();
    }
}
