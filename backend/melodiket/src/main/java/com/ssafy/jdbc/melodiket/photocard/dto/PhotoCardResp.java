package com.ssafy.jdbc.melodiket.photocard.dto;

import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.photocard.entity.PhotoCardEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
public class PhotoCardResp {
    UUID photocardUuid;
    UUID ticketUuid;
    UUID concertUuid;
    String concertName;
    String imageCid;
    LocalDateTime createdAt;
    LocalDateTime startAt;
    String stageName;
    Long seatRow;
    Long seatCol;
    List<String> musicians;
    String favoriteMusician;
    String nickName;

    public static PhotoCardResp from(PhotoCardEntity entity){
        TicketEntity ticket = entity.getTicketEntity();
        ConcertEntity concert = ticket.getConcertEntity();
        StageEntity stage = concert.getStageEntity();

        return PhotoCardResp.builder()
                .photocardUuid(entity.getUuid())
                .concertName(concert.getTitle())
                .imageCid(entity.getImageCid())
                .createdAt(entity.getCreatedAt())
                .startAt(concert.getStartAt())
                .stageName(stage.getName())
                .seatRow(stage.getNumOfRow())
                .seatCol(stage.getNumOfRow())
                .musicians(concert.getConcertParticipantMusicians().stream().map((m)->
                    m.getMusicianEntity().getNickname()
                ).toList())
                .favoriteMusician(entity.getFavoriteMusician())
                .nickName(entity.getPhotocardOwner())
                .build();
    }

    public static PhotoCardResp fromForAll(PhotoCardEntity entity){
        TicketEntity ticket = entity.getTicketEntity();
        ConcertEntity concert = ticket.getConcertEntity();
        StageEntity stage = concert.getStageEntity();

        return PhotoCardResp.builder()
                .concertUuid(concert.getUuid())
                .ticketUuid(ticket.getUuid())
                .photocardUuid(entity.getUuid())
                .concertName(concert.getTitle())
                .imageCid(entity.getImageCid())
                .createdAt(entity.getCreatedAt())
                .startAt(concert.getStartAt())
                .stageName(stage.getName())
                .seatRow(stage.getNumOfRow())
                .seatCol(stage.getNumOfRow())
                .musicians(concert.getConcertParticipantMusicians().stream().map((m)->
                        m.getMusicianEntity().getNickname()
                ).toList())
                .favoriteMusician(entity.getFavoriteMusician())
                .nickName(entity.getPhotocardOwner())
                .build();
    }

}
