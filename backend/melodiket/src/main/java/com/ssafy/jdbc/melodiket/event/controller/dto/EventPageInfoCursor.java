package com.ssafy.jdbc.melodiket.event.controller.dto;

public record EventPageInfoCursor(
        boolean hasNextPage,
        int requestedSize,
        int responsedSize,
        String lastId
) {}