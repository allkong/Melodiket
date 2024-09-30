package com.ssafy.jdbc.melodiket.stage.dto;

import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StageInfoResponse {
    private UUID uuid;
    private String name;
    private String address;
    private Boolean isStanding;
    private Long numOfRow;
    private Long numOfCol;
    private Long capacity;

    public static StageInfoResponse from(StageEntity entity) {
        return StageInfoResponse.builder()
                .uuid(entity.getUuid())
                .name(entity.getName())
                .address(entity.getAddress())
                .isStanding(entity.getIsStanding())
                .numOfRow(entity.getNumOfRow())
                .numOfCol(entity.getNumOfCol())
                .capacity(entity.getCapacity())
                .build();
    }
}