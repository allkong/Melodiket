package com.ssafy.jdbc.melodiket.concert.repository;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertSeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ConcertSeatEntityRepository extends JpaRepository<ConcertSeatEntity, Long> {
    ConcertSeatEntity findByConcertEntity_UuidAndSeatRowAndSeatCol(UUID concertUuid, Long seatRow, Long seatCol);
}