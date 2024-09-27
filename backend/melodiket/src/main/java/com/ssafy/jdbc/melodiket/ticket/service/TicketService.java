package com.ssafy.jdbc.melodiket.ticket.service;

import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketResponse;
import com.ssafy.jdbc.melodiket.ticket.entity.Status;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.ticket.repository.TicketRepository;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusician;
import com.ssafy.jdbc.melodiket.user.repository.AudienceRepository;
import com.ssafy.jdbc.melodiket.user.repository.FavoriteMusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final AudienceRepository audienceRepository;
    private final MusicianRepository musicianRepository;
    private final TicketRepository ticketRepository;
    private final ConcertRepository concertRepository;
    private final FavoriteMusicianRepository favoriteMusicianRepository;

    public TicketResponse createTicket(String loginId, TicketPurchaseRequest ticketPurchaseRequest){
        AudienceEntity audienceEntity = audienceRepository.findByUser_LoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));
        ConcertEntity concert = concertRepository.findByUuid(ticketPurchaseRequest.getConcertId()).get();

        UUID ticketUUID = UUID.randomUUID();
        TicketEntity ticket = ticketRepository.save(TicketEntity.builder()
                        .uuid(ticketUUID)
                        .audienceEntity(audienceEntity)
                        .concertEntity(concert)
                        .status(Status.NOT_USED)
                        .seatRow(ticketPurchaseRequest.getSeatRow())
                        .seatCol(ticketPurchaseRequest.getSearCol())
                .build()
        );

        Optional<MusicianEntity> _favoriteMusician = musicianRepository.findByUuid(ticketPurchaseRequest.getFavoriteMusician());
        MusicianEntity favoriteMusician = null;
        if(_favoriteMusician.isPresent()){
            favoriteMusician = _favoriteMusician.get();
            favoriteMusicianRepository.save(
                    FavoriteMusician.builder()
                            .musicianEntity(_favoriteMusician.get())
                            .audienceEntity(audienceEntity)
                            .build()
            );
        }

        return TicketResponse.builder()
                .ticketUuid(ticketUUID)
                .concertTitle(concert.getTitle())
                .posterCid(concert.getPosterCid())
                .stageName(concert.getStageEntity().getName())
                .stageAddress(concert.getStageEntity().getAddress())
                .ticketPrice(concert.getTicketPrice())
                .status(TicketResponse.TicketStatus.NOT_USED)
                .seatRow(ticket.getSeatRow())
                .seatCol(ticket.getSeatCol())
                .refundAt(null)
                .usedAt(null)
                .createdAt(ticket.getCreatedAt())
                .startAt(concert.getStartAt())
                .myFavoriteMusician(favoriteMusician==null?null:
                        TicketResponse.FavoriteMusicianDto.builder()
                            .musicianName(favoriteMusician.getNickname())
                            .musicianImageUrl(favoriteMusician.getImageUrl())
                            .build()
                )
                .build();
    }

}
