package com.ssafy.jdbc.melodiket.photocard.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record PhotoCardCreateReq(
        @NotNull(message = "`ticketUuid` is required")
        UUID ticketUuid,
        @NotBlank(message = "`imageCid` is required")
        String imageCid
) {
}
