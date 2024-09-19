package com.ssafy.jdbc.melodiket.user.entity.favorite;

import com.ssafy.jdbc.melodiket.user.entity.Audience;
import com.ssafy.jdbc.melodiket.user.entity.Musician;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "favorite_musician")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteMusician {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "audience_id", nullable = false)
    private Audience audience;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "musician_id", nullable = false)
    private Musician musician;

}
