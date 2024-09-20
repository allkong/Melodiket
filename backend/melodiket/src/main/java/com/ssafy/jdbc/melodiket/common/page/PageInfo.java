package com.ssafy.jdbc.melodiket.common.page;

public record PageInfo(
        boolean hasNextPage,
        boolean hasPrevPage,
        int pageNo,
        int requestedSize,
        int responsedSize
) {}
