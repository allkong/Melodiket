package com.ssafy.a310.bank.common.controller.query.dto;

public record PageInfoResp(
        boolean hasNextPage,
        int requestedSize,
        int responseSize
) {
}
