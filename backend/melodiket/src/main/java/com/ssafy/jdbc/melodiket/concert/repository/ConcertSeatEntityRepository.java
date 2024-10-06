package com.ssafy.jdbc.melodiket.concert.repository;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertSeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConcertSeatEntityRepository extends JpaRepository<ConcertSeatEntity, Long> {
}