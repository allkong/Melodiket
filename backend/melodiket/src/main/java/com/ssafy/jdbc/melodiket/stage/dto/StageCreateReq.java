package com.ssafy.jdbc.melodiket.stage.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public abstract class StageCreateReq {
    @NotBlank(message = "Name is required and cannot be blank.")
    public String name;

    @NotBlank(message = "Address is required and cannot be blank.")
    public String address;
}