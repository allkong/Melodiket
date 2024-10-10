package com.ssafy.jdbc.melodiket.account.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record AccountCertificationReq(
        @NotBlank(message = "`targetNumber` must not be blank")
        String targetNumber,
        @NotBlank(message = "`ownerName` must not be blank")
        String ownerName,
        @NotBlank(message = "`bankName` must not be blank")
        String bankName
) {
}
