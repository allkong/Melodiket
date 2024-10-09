package com.ssafy.jdbc.melodiket.concert.controller.dto;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertStatus;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianInfo;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteConcertEntity;
import lombok.Builder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
public record ConcertResp(
        UUID concertUuid,                // 공연 UUID
        UUID stageUuid,           // 공연장 UUID
        String title,             // 공연 타이틀
        LocalDateTime createdAt,  // 생성 날짜
        LocalDateTime startAt,    // 공연 시작 날짜
        LocalDateTime ticketingAt,// 티켓팅 시작 날짜
        Long availableTickets,    // 남은 티켓 수
        String description,       // 공연 설명
        String posterCid,         // 공연 포스터 이미지 CID
        Long ticketPrice,         // 티켓 가격
        Long ownerStake,          // 관리자 정산 금액
        Long musicianStake,       // 뮤지션 정산 금액
        Long favoriteMusicianStake,// 최애 뮤지션 정산 금액
        String stageName,         // 공연장 이름
        List<MusicianInfo> musicians, // 공연에 참여한 뮤지션 정보 리스트 (이름 및 이미지 URL)
        Long capacity,             // 공연장 수용 인원
        Boolean isStanding,        // 스탠딩 여부
        ConcertStatus status,       // 공연 상태
        Boolean isLike
) {
    public static ConcertResp from(ConcertEntity entity) {
        List<MusicianInfo> musicians = entity.getConcertParticipantMusicians().stream()
                .map(participant -> new MusicianInfo(
                        participant.getMusicianEntity().getUuid(),
                        participant.getMusicianEntity().getName(),
                        participant.getMusicianEntity().getImageUrl()))
                .toList();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean _isLike = false;
        if (authentication.getAuthorities().stream().anyMatch(grantedAuthority -> "ROLE_AUDIENCE".equals(grantedAuthority.getAuthority()))) {
            AudienceEntity user = (AudienceEntity) authentication.getPrincipal();
            for (FavoriteConcertEntity f : entity.getFavoriteConcerts()){
                if ((long) f.getAudienceEntity().getId() == user.getId()) {
                    _isLike = true;
                    break;
                }
            }
        }

        return ConcertResp.builder()
                .concertUuid(entity.getUuid())
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
                .favoriteMusicianStake(entity.getFavoriteMusicianStake())
                .stageName(entity.getStageEntity().getName())  // 공연장 이름
                .musicians(musicians)  // 뮤지션 이름 및 이미지 URL 리스트
                .capacity(entity.getStageEntity().getCapacity()) // 공연장 수용 인원
                .isStanding(entity.getStageEntity().getIsStanding()) // 공연장 스탠딩 여부
                .status(entity.getConcertStatus())
                .isLike(_isLike)
                .build();
    }
}
