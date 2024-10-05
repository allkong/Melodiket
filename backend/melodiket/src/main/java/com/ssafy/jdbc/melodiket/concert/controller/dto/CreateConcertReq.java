package com.ssafy.jdbc.melodiket.concert.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class CreateConcertReq {
    private final UUID stageUuid;            // 공연장 UUID
    private final String title;              // 공연 제목
    private final LocalDateTime startAt;     // 공연 시작 시간
    private final LocalDateTime ticketingAt; // 티켓팅 시작 시간
    private final String description;        // 공연 설명
    private final String posterCid;          // 공연 포스터 이미지 CID
    private final Long ticketPrice;          // 티켓 가격 (토큰)
    private final Long ownerStake;           // 관리자 정산 금액
    private final Long musicianStake;        // 뮤지션 정산 금액
    private final Long favoriteMusicianStake; // 최애 뮤지션 정산 금액
    private final List<UUID> musicians;
}
