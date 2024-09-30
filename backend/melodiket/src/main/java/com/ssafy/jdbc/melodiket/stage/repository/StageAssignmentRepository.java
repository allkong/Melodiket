package com.ssafy.jdbc.melodiket.stage.repository;

import com.ssafy.jdbc.melodiket.stage.entity.StageAssignmentEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageAssignmentRepository extends JpaRepository<StageAssignmentEntity, Long> {
    Boolean existsByStageEntityAndStageManagerEntity(StageEntity stageEntity, StageManagerEntity stageManagerEntity);
}
