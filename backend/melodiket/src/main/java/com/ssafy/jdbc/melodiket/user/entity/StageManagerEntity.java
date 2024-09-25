package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.stage.entity.StageAssignmentEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stage_manager")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
public class StageManagerEntity extends AppUserEntity {
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private AppUserEntity user;

    private String imageUrl;

    @OneToMany(mappedBy = "stageManagerEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StageAssignmentEntity> stageAssignmentEntities = new ArrayList<>();

    public StageManagerEntity(String description, String imageUrl, List<StageAssignmentEntity> stageAssignmentEntities) {
        this.imageUrl = imageUrl;
        this.stageAssignmentEntities = stageAssignmentEntities != null ? stageAssignmentEntities : new ArrayList<>();
    }
}
