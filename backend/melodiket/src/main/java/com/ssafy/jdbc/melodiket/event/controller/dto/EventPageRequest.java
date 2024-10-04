package com.ssafy.jdbc.melodiket.event.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventPageRequest {
    @NotNull(message = "`isFirstPage` must not be null")
    private boolean isFirstPage;
    private String lastId;
    private Integer pageSize = 10;
    private String orderKey = "_id";
    private String orderDirection = "ASC";

    // Filter fields
    private String eventName;
}
