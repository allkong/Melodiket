package com.ssafy.jdbc.melodiket.common.controller.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CursorPagingReq {
    @NotNull(message = "`isFirstPage` must not be null")
    boolean isFirstPage;
    UUID lastUuid;
    @Min(value = 1, message = "`pageSize` must be greater than 0")
    Integer pageSize;
    String orderKey = "uuid";
    String orderDirection = "ASC";
}
