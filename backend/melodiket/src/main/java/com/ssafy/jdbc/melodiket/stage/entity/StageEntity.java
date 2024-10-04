package com.ssafy.jdbc.melodiket.stage.entity;

import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stage")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class StageEntity extends ExposableEntity {
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id", nullable = false)
    private StageManagerEntity owner;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Boolean isStanding;

    private Long numOfRow;
    private Long numOfCol;

    @Column(nullable = false)
    private Long capacity;

    @OneToMany(mappedBy = "stageEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConcertEntity> concerts = new ArrayList<>();

    public void update(String name, String address, Boolean isStanding, Long numOfRow, Long numOfCol, Long capacity) {
        this.name = name;
        this.address = address;
        this.isStanding = isStanding;
        this.numOfRow = numOfRow;
        this.numOfCol = numOfCol;
        this.capacity = capacity;
    }
}
