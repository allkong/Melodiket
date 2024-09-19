package com.ssafy.jdbc.melodiket.concert.entity;

import com.ssafy.jdbc.melodiket.user.entity.Musician;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "concert_participant_musician")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ConcertParticipantMusician {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false)
    private Concert concert;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "musician_id", nullable = false)
    private Musician musician;

}
