package com.ssafy.jdbc.melodiket.aws.dto;

import com.ssafy.jdbc.melodiket.user.entity.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CreateUploadPathRequest {

    @NotNull
    private Role type;

    @NotBlank
    private String fileName;

}
