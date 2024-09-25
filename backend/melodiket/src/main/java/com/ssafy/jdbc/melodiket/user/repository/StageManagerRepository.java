package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StageManagerRepository extends JpaRepository<StageManagerEntity,Long> {
    // 유저 UUID를 통해 StageManagerEntity 조회
    Optional<StageManagerEntity> findByUser_LoginId(String loginId);
}
