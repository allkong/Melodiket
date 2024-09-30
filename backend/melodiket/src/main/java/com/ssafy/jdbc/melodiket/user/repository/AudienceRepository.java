package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AudienceRepository extends JpaRepository<AudienceEntity, Long> {
    Optional<AudienceEntity> findByUser_LoginId(String loginId);
}
