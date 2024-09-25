package com.ssafy.jdbc.melodiket.auth.controller.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record SignUpReq(

        @NotBlank(message = "Login ID는 필수 입력 값입니다.")
        @Size(min = 5, max = 20, message = "Login ID는 5자 이상 20자 이하이어야 합니다.")
        String loginId,

        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Size(min = 5, message = "비밀번호는 최소 5자 이상이어야 합니다.")
        String password,

        @NotBlank(message = "닉네임은 필수 입력 값입니다.")
        @Size(min = 2, max = 15, message = "닉네임은 2자 이상 15자 이하이어야 합니다.")
        String nickname,

        String description,

        @URL(message = "유효하지 않은 url 형태입니다.")
        String imageUrl
) {
}
