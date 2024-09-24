package com.ssafy.jdbc.melodiket.stage.entity;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "stage")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private UUID uuid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Boolean isStanding;

    private Long numOfRow;
    private Long numOfCol;

    @Column(nullable = false)
    private Long capacity;

    @OneToMany(mappedBy = "stageEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StageAssignmentEntity> stageAssignmentEntities = new ArrayList<>();

    @OneToMany(mappedBy = "stageEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConcertEntity> concerts = new ArrayList<>();

}
