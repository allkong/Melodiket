package com.ssafy.jdbc.melodiket.account.controller.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TokenWithdrawReq(
        @NotBlank(message = "`accountNumber` must not be blank")
        String accountNumber,
        @NotNull(message = "`amount` must not be null")
        @Min(value = 1, message = "`amount` must be greater than or equal to 1")
        int amount
) {
}
