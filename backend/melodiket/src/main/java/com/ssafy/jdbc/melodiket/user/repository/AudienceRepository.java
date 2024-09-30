package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AudienceRepository extends JpaRepository<AudienceEntity, Long> {
    Optional<AudienceEntity> findByUuid(UUID uuid);
}
