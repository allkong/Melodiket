package com.ssafy.jdbc.melodiket.stage.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StageRequest {

    @NotBlank(message = "Name is required and cannot be blank.")
    private String name;

    @NotBlank(message = "Address is required and cannot be blank.")
    private String address;

    @NotNull(message = "Standing status is required.")
    private Boolean isStanding;

    @Min(value = 1, message = "Number of rows must be at least 1.")
    private Long numOfRow = 0L;

    @Min(value = 1, message = "Number of columns must be at least 1.")
    private Long numOfCol = 0L;

    @NotNull(message = "Capacity is required.")
    @Min(value = 1, message = "Capacity must be at least 1.")
    private Long capacity;
}