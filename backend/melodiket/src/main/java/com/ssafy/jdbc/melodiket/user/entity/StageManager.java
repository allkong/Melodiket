package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.stage.entity.StageAssignment;
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
public class StageManager extends AppUser {
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private AppUser user;

    private String description;

    private String imageUrl;

    @OneToMany(mappedBy = "stageManager", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StageAssignment> stageAssignments = new ArrayList<>();

}
