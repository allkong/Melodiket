package com.ssafy.jdbc.melodiket.common.page;

import java.util.List;

public record PageResponse<T>(
        PageInfo pageInfo,
        List<T> result
) {
}
