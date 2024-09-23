package com.ssafy.jdbc.melodiket.user.entity.favorite;

import com.ssafy.jdbc.melodiket.concert.entity.Concert;
import com.ssafy.jdbc.melodiket.user.entity.Audience;
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
    private Audience audience;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false)
    private Concert concert;
}
