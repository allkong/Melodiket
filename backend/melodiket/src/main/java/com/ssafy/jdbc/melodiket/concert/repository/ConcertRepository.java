package com.ssafy.jdbc.melodiket.concert.repository;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConcertRepository extends JpaRepository<ConcertEntity, Long> {
    Optional<ConcertEntity> findByUuid(UUID uuid);

    List<ConcertEntity> findAllByStageEntityIn(List<StageEntity> stageEntities);
}
