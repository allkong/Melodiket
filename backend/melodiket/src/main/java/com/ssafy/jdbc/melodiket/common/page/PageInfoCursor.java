package com.ssafy.jdbc.melodiket.common.page;

import java.util.UUID;

public record PageInfoCursor(
        boolean hasNextPage,
        int requestedSize,
        int responsedSize,
        UUID uuid
) {}
