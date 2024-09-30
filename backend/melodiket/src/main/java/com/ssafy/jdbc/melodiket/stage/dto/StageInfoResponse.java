package com.ssafy.jdbc.melodiket.stage.dto;

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
}