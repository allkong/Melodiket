package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.stage.entity.StageAssignmentEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stage_manager")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StageManagerEntity extends AppUserEntity {
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private AppUserEntity user;

    private String description;

    private String imageUrl;

    @OneToMany(mappedBy = "stageManagerEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StageAssignmentEntity> stageAssignmentEntities = new ArrayList<>();

}
