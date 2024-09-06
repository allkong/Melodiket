package com.ssafy.a310.bank.common.controller.query.dto;

import java.util.List;

public record CursorPageResp<T>(
        PageInfoResp pageInfo,
        List<T> data
) {
}
