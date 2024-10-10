package com.ssafy.jdbc.melodiket.concert.entity;

import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "concert_seat", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"seatRow", "seatCol", "concert_id"})
})
public class ConcertSeatEntity extends BaseEntity {

    @Column(nullable = false)
    private Long seatRow;

    @Column(nullable = false)
    private Long seatCol;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false)
    private ConcertEntity concertEntity;

    @Column(nullable = false)
    private Boolean isAvailable = true;  // 좌석의 구매 가능 상태 (기본값: true)

    // 좌석 상태를 구매 불가능으로 변경하는 메서드
    public void purchase() {
        this.isAvailable = false;
    }

    // 좌석 상태를 다시 구매 가능으로 변경하는 메서드
    public void cancel() {
        this.isAvailable = true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ConcertSeatEntity that = (ConcertSeatEntity) o;

        if (!seatRow.equals(that.seatRow)) return false;
        if (!seatCol.equals(that.seatCol)) return false;
        return concertEntity != null && concertEntity.getUuid().equals(that.getConcertEntity().getUuid());
    }

    @Override
    public int hashCode() {
        int result = seatRow != null ? seatRow.hashCode() : 0;
        result = 31 * result + (seatCol != null ? seatCol.hashCode() : 0);
        result = 31 * result + (concertEntity != null ? concertEntity.getUuid().hashCode() : 0);
        return result;
    }
}
