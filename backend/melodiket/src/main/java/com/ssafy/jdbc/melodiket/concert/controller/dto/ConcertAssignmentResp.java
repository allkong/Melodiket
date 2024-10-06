package com.ssafy.jdbc.melodiket.concert.controller.dto;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@ToString
public class ConcertAssignmentResp {
    private String uuid;
    private String title;
    private String stageName;
    private LocalDateTime createdAt;
    private LocalDateTime startAt;
    private LocalDateTime ticketingAt;
    private String description;
    private long ticketPrice;
    private String concertStatus;
    private String approvalStatus;

    public ConcertAssignmentResp(ConcertParticipantMusicianEntity entity) {
        ConcertEntity concert = entity.getConcertEntity();
        this.uuid = concert.getUuid().toString();
        this.title = concert.getTitle();
        this.stageName = concert.getStageEntity().getName();
        this.createdAt = concert.getCreatedAt();
        this.startAt = concert.getStartAt();
        this.ticketingAt = concert.getTicketingAt();
        this.description = concert.getDescription();
        this.ticketPrice = concert.getTicketPrice();
        this.concertStatus = concert.getConcertStatus().name();
        this.approvalStatus = entity.getApprovalStatus().name();
    }

    public static ConcertAssignmentResp from(ConcertParticipantMusicianEntity entity) {
        return new ConcertAssignmentResp(entity);
    }
}
