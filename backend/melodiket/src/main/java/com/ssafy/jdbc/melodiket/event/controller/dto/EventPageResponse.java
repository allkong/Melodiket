package com.ssafy.jdbc.melodiket.event.controller.dto;

import java.util.List;

public record EventPageResponse<T>(
        EventPageInfoCursor pageInfo,
        List<T> result
) {
}