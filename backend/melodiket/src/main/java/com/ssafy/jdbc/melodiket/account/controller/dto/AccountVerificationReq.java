package com.ssafy.jdbc.melodiket.account.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record AccountVerificationReq(
        @NotBlank(message = "`targetNumber` must not be blank")
        String targetNumber,
        @NotBlank(message = "`verificationCode` must not be blank")
        String verificationCode
) {
}
