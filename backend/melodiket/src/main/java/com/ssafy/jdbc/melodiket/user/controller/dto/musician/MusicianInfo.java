package com.ssafy.jdbc.melodiket.user.controller.dto.musician;

import java.util.UUID;

public record MusicianInfo(
        UUID musicianUuid,
        String name,
        String imageUrl
) {}