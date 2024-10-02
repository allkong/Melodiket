package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AudienceRepository extends JpaRepository<AudienceEntity, Long> {
    Optional<AudienceEntity> findByUuid(UUID uuid);
    Optional<AudienceEntity> findByUser_LoginId(String loginId);
}
