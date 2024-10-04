package com.ssafy.jdbc.melodiket.concert.controller.dto;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
public class CreateStandingConcertReq extends CreateConcertReq {
    private final Long availableTickets;     // 남은 티켓 수

    public CreateStandingConcertReq(UUID stageUuid, String title, LocalDateTime startAt, LocalDateTime ticketingAt, String description, String posterCid, Long ticketPrice, Long ownerStake, Long musicianStake, Long favoriteMusicianStake, List<UUID> musicians, Long availableTickets) {
        super(stageUuid, title, startAt, ticketingAt, description, posterCid, ticketPrice, ownerStake, musicianStake, favoriteMusicianStake, musicians);
        this.availableTickets = availableTickets;
    }
}
