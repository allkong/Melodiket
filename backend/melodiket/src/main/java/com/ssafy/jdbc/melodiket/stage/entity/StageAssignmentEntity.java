package com.ssafy.jdbc.melodiket.stage.entity;

import com.ssafy.jdbc.melodiket.user.entity.StageManager;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stage_assignment")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StageAssignmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id", nullable = false)
    private StageEntity stage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_manager_id", nullable = false)
    private StageManager stageManager;

}
