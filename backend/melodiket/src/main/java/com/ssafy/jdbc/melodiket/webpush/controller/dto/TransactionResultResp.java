package com.ssafy.jdbc.melodiket.webpush.controller.dto;

import lombok.Builder;

@Builder
public record TransactionResultResp(
        ResultStatus status,
        String operationId,
        String operation,
        String targetUuid
) {
    public enum ResultStatus {
        SUCCESS,
        FAIL
    }
}
