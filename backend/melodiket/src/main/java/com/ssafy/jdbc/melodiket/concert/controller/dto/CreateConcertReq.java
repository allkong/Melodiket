package com.ssafy.jdbc.melodiket.concert.controller.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record CreateConcertReq(
        UUID stageUuid,            // 공연장 UUID
        String title,              // 공연 제목
        LocalDateTime startAt,     // 공연 시작 시간
        LocalDateTime ticketingAt, // 티켓팅 시작 시간
        Long availableTickets,     // 남은 티켓 수
        String description,        // 공연 설명
        String posterCid,          // 공연 포스터 이미지 CID
        Long ticketPrice,          // 티켓 가격 (토큰)
        Long ownerStake,           // 관리자 정산 금액
        Long musicianStake,        // 뮤지션 정산 금액
        Long favoriteMusicianStake, // 최애 뮤지션 정산 금액
        List<UUID> musicianUuids
) {
}
