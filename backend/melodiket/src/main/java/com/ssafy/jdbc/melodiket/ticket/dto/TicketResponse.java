package com.ssafy.jdbc.melodiket.ticket.dto;

import com.ssafy.jdbc.melodiket.ticket.entity.Status;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponse {
    private String userName;

    private UUID ticketUuid; // 티켓 주소

    private String concertTitle; // 공연 이름

    private String posterCid; // 공연 포스터 이미지 CID

    private String stageName; // 공연장 이름

    private String stageAddress; // 공연장 주소

    private Long ticketPrice; // 티켓 가격 (토큰)

    private Status status; // 티켓 상태 (ENUM)

    private Long seatRow; // 좌석 행 번호

    private Long seatCol; // 좌석 열 번호

    private LocalDateTime refundAt; // 환불 날짜

    private LocalDateTime usedAt; // 사용 날짜

    private LocalDateTime createdAt; // 발급일

    private LocalDateTime startAt; // 공연 날짜

    private FavoriteMusicianDto myFavoriteMusician; // 뮤지션 정보

    private UUID concertUUID;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FavoriteMusicianDto {
        private String musicianName; // 뮤지션 이름
        private String musicianImageUrl; // 뮤지션 프로필 사진 URL
    }
}