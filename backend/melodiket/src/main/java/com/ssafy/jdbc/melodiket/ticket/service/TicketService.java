package com.ssafy.jdbc.melodiket.ticket.service;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.service.redis.DistributedLock;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketResponse;
import com.ssafy.jdbc.melodiket.ticket.entity.Status;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.ticket.repository.TicketRepository;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.AudienceRepository;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import com.ssafy.jdbc.melodiket.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class TicketService {
    private final AudienceRepository audienceRepository;
    private final MusicianRepository musicianRepository;
    private final TicketRepository ticketRepository;
    private final ConcertRepository concertRepository;
    private final StageManagerRepository stageManagerRepository;
    private final WalletService walletService;
    private final BlockchainConfig blockchainConfig;

    @Async
    @DistributedLock(key = "#loginId.concat('-').'purchaseTicket'.concat('-').concat(#ticketPurchaseRequest.concertId)")
    @Transactional(rollbackFor = Exception.class)
    public void createTicket(String loginId, TicketPurchaseRequest ticketPurchaseRequest) {
        AudienceEntity audienceEntity = audienceRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));
        ConcertEntity concert = concertRepository.findByUuid(ticketPurchaseRequest.getConcertId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));
        MusicianEntity favoriteMusician = musicianRepository.findByUuid(ticketPurchaseRequest.getFavoriteMusician())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        /// 티켓을 살만큼 충분한 토큰이 있는지 확인
        WalletResp audienceWallet = walletService.getWalletOf(audienceEntity);
        if (audienceWallet.tokenBalance() < ticketPurchaseRequest.getTokenAmount()) {
            throw new HttpResponseException(ErrorDetail.NOT_ENOUGH_TOKEN_BALANCE);
        }

        WalletResp favoriteMusicianWallet = walletService.getWalletOf(favoriteMusician);
//        Credentials audienceCredentials = Credentials.create(audienceEntity.);
//        AudienceContract audienceContract = new AudienceContract(blockchainConfig, );


        UUID ticketUUID = UUID.randomUUID();

        TicketEntity ticket = ticketRepository.save(TicketEntity.builder()
                .uuid(ticketUUID)
                .userName(audienceEntity.getName())
                .audienceEntity(audienceEntity)
                .concertEntity(concert)
                .status(Status.NOT_USED)
                .seatRow(ticketPurchaseRequest.getSeatRow())
                .seatCol(ticketPurchaseRequest.getSearCol())
                .favoriteMusician(favoriteMusician != null ? favoriteMusician.getId() : null)
                .build()
        );

//        return TicketResponse.builder()
//                .userName(audienceEntity.getName())
//                .ticketUuid(ticketUUID)
//                .concertTitle(concert.getTitle())
//                .posterCid(concert.getPosterCid())
//                .stageName(concert.getStageEntity().getName())
//                .stageAddress(concert.getStageEntity().getAddress())
//                .ticketPrice(concert.getTicketPrice())
//                .status(Status.NOT_USED)
//                .seatRow(ticket.getSeatRow())
//                .seatCol(ticket.getSeatCol())
//                .refundAt(null)
//                .usedAt(null)
//                .createdAt(ticket.getCreatedAt())
//                .startAt(concert.getStartAt())
//                .myFavoriteMusician(favoriteMusician == null ? null :
//                        TicketResponse.FavoriteMusicianDto.builder()
//                                .musicianName(favoriteMusician.getNickname())
//                                .musicianImageUrl(favoriteMusician.getImageUrl())
//                                .build()
//                )
//                .build();
    }

    public Map<String, List<TicketResponse>> readMyTickets(String loginId) {
        AudienceEntity audienceEntity = audienceRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));
        List<TicketEntity> ticketEntities = audienceEntity.getTickets();

        List<TicketResponse> ticketResponses = ticketEntities.stream().map(
                (ticket) -> {
                    Optional<MusicianEntity> _favoriteMusician = musicianRepository.findById(ticket.getFavoriteMusician());
                    ConcertEntity concert = ticket.getConcertEntity();
                    StageEntity stage = concert.getStageEntity();
                    return TicketResponse.builder()
                            .userName(ticket.getUserName())
                            .ticketUuid(ticket.getUuid())
                            .concertTitle(concert.getTitle())
                            .posterCid(concert.getPosterCid())
                            .stageName(stage.getName())
                            .stageAddress(stage.getAddress())
                            .status(ticket.getStatus())
                            .refundAt(ticket.getRefundedAt())
                            .usedAt(ticket.getUsedAt())
                            .createdAt(ticket.getCreatedAt())
                            .startAt(concert.getStartAt())
                            .build();
                }
        ).toList();

        return Map.of("result", ticketResponses);
    }

    public TicketResponse readTicketDetail(UUID ticketUUID) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(ticketUUID);
        TicketEntity ticket = _ticket.orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        Optional<MusicianEntity> _favoriteMusician = musicianRepository.findById(ticket.getFavoriteMusician());
        ConcertEntity concert = ticket.getConcertEntity();
        StageEntity stage = concert.getStageEntity();

        return TicketResponse.builder()
                .userName(ticket.getUserName())
                .ticketUuid(ticket.getUuid())
                .concertTitle(concert.getTitle())
                .posterCid(concert.getPosterCid())
                .stageName(stage.getName())
                .stageAddress(stage.getAddress())
                .ticketPrice(ticket.getConcertEntity().getTicketPrice())
                .status(ticket.getStatus())
                .seatRow(ticket.getSeatRow())
                .seatCol(ticket.getSeatCol())
                .refundAt(ticket.getRefundedAt())
                .usedAt(ticket.getUsedAt())
                .createdAt(ticket.getCreatedAt())
                .startAt(concert.getStartAt())
                .myFavoriteMusician(
                        _favoriteMusician.map(musicianEntity -> TicketResponse.FavoriteMusicianDto.builder()
                                .musicianName(musicianEntity.getNickname())
                                .musicianImageUrl(musicianEntity.getImageUrl())
                                .build()).orElse(null))
                .build();
    }

    public TicketResponse useTicket(Principal principal, UUID ticketUUID) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(ticketUUID);
        TicketEntity ticket = _ticket.orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        Optional<MusicianEntity> _favoriteMusician = musicianRepository.findById(ticket.getFavoriteMusician());
        ConcertEntity concert = ticket.getConcertEntity();
        StageEntity stage = concert.getStageEntity();

        StageManagerEntity stageManager = stageManagerRepository.findByLoginId(principal.getName())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));

        if (stage.getOwner() != stageManager) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER);
        }

        ticket.updateStatusUsed(Status.USED);

        return TicketResponse.builder()
                .userName(ticket.getUserName())
                .ticketUuid(ticket.getUuid())
                .concertTitle(concert.getTitle())
                .posterCid(concert.getPosterCid())
                .stageName(stage.getName())
                .stageAddress(stage.getAddress())
                .ticketPrice(ticket.getConcertEntity().getTicketPrice())
                .status(Status.USED)
                .seatRow(ticket.getSeatRow())
                .seatCol(ticket.getSeatCol())
                .refundAt(ticket.getRefundedAt())
                .usedAt(ticket.getUsedAt())
                .createdAt(ticket.getCreatedAt())
                .startAt(concert.getStartAt())
                .myFavoriteMusician(
                        _favoriteMusician.map(musicianEntity -> TicketResponse.FavoriteMusicianDto.builder()
                                .musicianName(musicianEntity.getNickname())
                                .musicianImageUrl(musicianEntity.getImageUrl())
                                .build()).orElse(null))
                .build();
    }

    public TicketResponse refundTicket(UUID ticketUUID) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(ticketUUID);
        TicketEntity ticket = _ticket.orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        Optional<MusicianEntity> _favoriteMusician = musicianRepository.findById(ticket.getFavoriteMusician());
        ConcertEntity concert = ticket.getConcertEntity();
        StageEntity stage = concert.getStageEntity();

        ticket.updateStatusRefunded(Status.REFUNDED);

        //TODO:: 토큰 반환해주기

        return TicketResponse.builder()
                .userName(ticket.getUserName())
                .ticketUuid(ticket.getUuid())
                .concertTitle(concert.getTitle())
                .posterCid(concert.getPosterCid())
                .stageName(stage.getName())
                .stageAddress(stage.getAddress())
                .ticketPrice(ticket.getConcertEntity().getTicketPrice())
                .status(Status.USED)
                .seatRow(ticket.getSeatRow())
                .seatCol(ticket.getSeatCol())
                .refundAt(ticket.getRefundedAt())
                .usedAt(ticket.getUsedAt())
                .createdAt(ticket.getCreatedAt())
                .startAt(concert.getStartAt())
                .myFavoriteMusician(
                        _favoriteMusician.map(musicianEntity -> TicketResponse.FavoriteMusicianDto.builder()
                                .musicianName(musicianEntity.getNickname())
                                .musicianImageUrl(musicianEntity.getImageUrl())
                                .build()).orElse(null))
                .build();
    }
}