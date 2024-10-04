package com.ssafy.jdbc.melodiket.stage.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class StandingStageCreateReq extends StageCreateReq {
    @NotNull(message = "Capacity is required.")
    @Min(value = 1, message = "Capacity must be at least 1.")
    public long capacity;

    public StandingStageCreateReq(String name, String address, long capacity) {
        super(name, address);
        this.capacity = capacity;
    }
}
