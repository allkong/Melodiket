package com.ssafy.jdbc.melodiket.user.controller.authdto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginReq(

        @NotBlank(message = "Login ID는 필수 입력 값입니다.")
        @Size(min = 5, max = 20, message = "Login ID는 5자 이상 20자 이하이어야 합니다.")
        String loginId,

        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Size(min = 5, message = "비밀번호는 최소 5자 이상이어야 합니다.")
        String password
) {
}
