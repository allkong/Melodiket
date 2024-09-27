package com.ssafy.jdbc.melodiket.common.page;

public record PageInfo(
        boolean hasNextPage,
        int requestedSize,
        int responsedSize
) {
}
