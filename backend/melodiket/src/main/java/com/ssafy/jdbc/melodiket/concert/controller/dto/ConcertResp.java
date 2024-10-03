package com.ssafy.jdbc.melodiket.concert.controller.dto;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
public record ConcertResp(
        UUID uuid,                // 공연 UUID
        UUID stageUuid,            // 공연장 UUID
        String title,              // 공연 타이틀
        LocalDateTime createdAt,   // 생성 날짜
        LocalDateTime startAt,     // 공연 시작 날짜
        LocalDateTime ticketingAt, // 티켓팅 시작 날짜
        Long availableTickets,     // 남은 티켓 수
        String description,        // 공연 설명
        String posterCid,          // 공연 포스터 이미지 CID
        Long ticketPrice,          // 티켓 가격
        Long ownerStake,           // 관리자 정산 금액
        Long musicianStake,        // 뮤지션 정산 금액
        Long favoriteMusicianStake, // 최애 뮤지션 정산 금액
        String stageName,          // 공연장 이름
        List<UUID> musicians,       // 공연에 참여한 뮤지션 UUID 리스트
        boolean status
) {
    public static ConcertResp from(ConcertEntity entity) {
        List<UUID> musicians = entity.getConcertParticipantMusicians().stream()
                .map(musicianEntity -> musicianEntity.getMusicianEntity().getUuid())
                .toList();
        return ConcertResp.builder()
                .uuid(entity.getUuid())
                .stageUuid(entity.getStageEntity().getUuid())
                .title(entity.getTitle())
                .createdAt(entity.getCreatedAt())
                .startAt(entity.getStartAt())
                .ticketingAt(entity.getTicketingAt())
                .availableTickets(entity.getAvailableTickets())
                .description(entity.getDescription())
                .posterCid(entity.getPosterCid())
                .ticketPrice(entity.getTicketPrice())
                .ownerStake(entity.getOwnerStake())
                .musicianStake(entity.getMusicianStake())
                .favoriteMusicianStake(entity.getMusicianStake())
                .stageName(entity.getStageEntity().getName())
                .musicians(musicians)
                .status(entity.isDeleted())
                .build();
    }
}
