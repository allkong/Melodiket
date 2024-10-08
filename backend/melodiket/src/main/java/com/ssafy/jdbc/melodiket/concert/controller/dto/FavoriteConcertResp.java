package com.ssafy.jdbc.melodiket.concert.controller.dto;

import java.util.UUID;

public record FavoriteConcertResp(
        UUID audienceId,
        UUID concertId,
        Boolean isFavorite
) {
}
