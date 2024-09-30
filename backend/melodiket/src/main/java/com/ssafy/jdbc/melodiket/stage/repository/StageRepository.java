package com.ssafy.jdbc.melodiket.stage.repository;

import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StageRepository extends JpaRepository<StageEntity, Long> {
    Optional<Long> findIdByUuid(UUID uuid);
    Optional<StageEntity> findByUuid(UUID uuid);
}
