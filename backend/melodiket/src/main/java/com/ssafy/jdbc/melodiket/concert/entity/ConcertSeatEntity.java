package com.ssafy.jdbc.melodiket.concert.entity;

import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "concert_seat", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"seatRow", "seatCol", "concert_id"})
})
public class ConcertSeatEntity extends BaseEntity {
    private Long seatRow;
    private Long seatCol;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false)
    private ConcertEntity concertEntity;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ConcertSeatEntity that = (ConcertSeatEntity) o;

        // row와 col로 비교
        if (!seatRow.equals(that.seatRow)) return false;
        return seatCol.equals(that.seatCol);
    }

    @Override
    public int hashCode() {
        int result = seatRow != null ? seatRow.hashCode() : 0;
        result = 31 * result + (seatCol != null ? seatCol.hashCode() : 0);
        return result;
    }
}
