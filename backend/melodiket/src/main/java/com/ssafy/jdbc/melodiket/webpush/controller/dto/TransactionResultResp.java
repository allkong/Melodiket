package com.ssafy.jdbc.melodiket.webpush.controller.dto;

import lombok.Builder;

import java.util.Map;
import java.util.Objects;

@Builder
public record TransactionResultResp(
        ResultStatus status,
        String operationId,
        String operation,
        String targetUuid,
        Map<String, Objects> additionalInfo
) {
    public enum ResultStatus {
        SUCCESS,
        FAIL
    }
}
