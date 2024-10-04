package com.ssafy.jdbc.melodiket.token.service.dto;

import com.ssafy.jdbc.melodiket.token.entity.TokenTransactionLogEntity;
import lombok.Builder;

@Builder
public record TokenTransactionLogResp(
        String uuid,
        String from,
        String to,
        long amount,
        String type
) {
    public static TokenTransactionLogResp from(TokenTransactionLogEntity entity) {
        return TokenTransactionLogResp.builder()
                .uuid(entity.getUuid().toString())
                .from(entity.getFromIdentifier())
                .to(entity.getToIdentifier())
                .amount(entity.getAmount())
                .type(entity.getLogType().toString())
                .build();
    }
}
