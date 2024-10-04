package com.ssafy.jdbc.melodiket.stage.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SeatingStageCreateReq extends StageCreateReq {
    @NotNull(message = "field 'numOfRow' is null")
    @Min(value = 1, message = "field 'numOfRow' must be greater than 0")
    public long numOfRow;

    @NotNull(message = "field 'numOfCol' is null")
    @Min(value = 1, message = "field 'numOfCol' must be greater than 0")
    public long numOfCol;

    public SeatingStageCreateReq(String name, String address, long numOfRow, long numOfCol) {
        super(name, address);
        this.numOfRow = numOfRow;
        this.numOfCol = numOfCol;
    }
}
