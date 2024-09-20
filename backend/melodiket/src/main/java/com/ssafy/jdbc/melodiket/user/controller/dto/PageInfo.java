package com.ssafy.jdbc.melodiket.user.controller.dto;

public record PageInfo(
        boolean hasNextPage,
        boolean hasPrevPage,
        int pageNo,
        int requestedSize,
        int responsedSize
) {}
