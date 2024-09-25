package com.ssafy.jdbc.melodiket.auth.repository;

import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AudienceRepository extends JpaRepository<AudienceEntity, Long> {
}
