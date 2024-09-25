package com.ssafy.jdbc.melodiket.user.entity.favorite;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "favorite_concert")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteConcert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "audience_id", nullable = false)
    private AudienceEntity audienceEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false)
    private ConcertEntity concertEntity;
}
