package com.ssafy.jdbc.melodiket.auth.repository;

import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StageMangerRepository extends JpaRepository<StageManagerEntity, Long> {
}
