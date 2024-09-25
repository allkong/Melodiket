package com.ssafy.a310.bank.account.controller.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TransferReq(
        String senderName,
        @NotBlank(message = "`receiverAccountNumber` must not be null")
        String receiverAccountNumber,
        @NotNull(message = "`amount` must not be null")
        @Min(value = 1, message = "`amount` must be greater than 0")
        int amount
) {
}
