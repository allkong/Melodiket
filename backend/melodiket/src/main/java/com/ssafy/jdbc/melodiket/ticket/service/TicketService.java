package com.ssafy.jdbc.melodiket.ticket.service;

import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.service.redis.DistributedLock;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertSeatEntity;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertRepository;
import com.ssafy.jdbc.melodiket.concert.repository.ConcertSeatEntityRepository;
import com.ssafy.jdbc.melodiket.concert.service.contract.AudienceContract;
import com.ssafy.jdbc.melodiket.concert.service.contract.ManagerContract;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketPurchaseRequest;
import com.ssafy.jdbc.melodiket.ticket.dto.TicketResponse;
import com.ssafy.jdbc.melodiket.ticket.entity.Status;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.ticket.repository.TicketRepository;
import com.ssafy.jdbc.melodiket.token.service.contract.MelodyTokenContract;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.AudienceRepository;
import com.ssafy.jdbc.melodiket.user.repository.MusicianRepository;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import com.ssafy.jdbc.melodiket.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;

import java.util.*;

@Slf4j
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
    private final ConcertSeatEntityRepository concertSeatEntityRepository;

    public void checkTicketPurchaseAvailable(AppUserEntity user, TicketPurchaseRequest ticketPurchaseRequest) {
        AudienceEntity audienceEntity = audienceRepository.findByLoginId(user.getLoginId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));

        ConcertEntity concert = concertRepository.findByUuid(ticketPurchaseRequest.getConcertId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        /// 티켓을 살만큼 충분한 토큰이 있는지 확인
        WalletResp audienceWallet = walletService.getWalletOf(audienceEntity);
        Credentials audienceCredentials = Credentials.create(audienceWallet.privateKey());
        MelodyTokenContract contract = new MelodyTokenContract(blockchainConfig, audienceCredentials);

        if (contract.balanceOf(audienceWallet.address()) < concert.getTicketPrice()) {
            throw new HttpResponseException(ErrorDetail.NOT_ENOUGH_TOKEN_BALANCE);
        }

        // 좌석 확인
        if (!concert.getStageEntity().getIsStanding()) {
            int row = ticketPurchaseRequest.getSeatRow().intValue();
            int col = ticketPurchaseRequest.getSeatCol().intValue();
            Set<ConcertSeatEntity> seats = concert.getConcertSeats();
            if (seats.stream().noneMatch(seat -> seat.getSeatRow() == row && seat.getSeatCol() == col)) {
                throw new HttpResponseException(ErrorDetail.ALREADY_PURCHASED_SEAT);
            }
        }
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-purchaseTicket')")
    @Transactional(rollbackFor = Exception.class, timeout = 120)
    public void createTicket(String loginId, AppUserEntity user, TicketPurchaseRequest ticketPurchaseRequest) {
        AudienceEntity audienceEntity = audienceRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));
        ConcertEntity concert = concertRepository.findByUuid(ticketPurchaseRequest.getConcertId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));
        MusicianEntity favoriteMusician = musicianRepository.findByUuid(ticketPurchaseRequest.getFavoriteMusician())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        WalletResp audienceWallet = walletService.getWalletOf(audienceEntity);
        Credentials audienceCredentials = Credentials.create(audienceWallet.privateKey());
        AudienceContract audienceContract = new AudienceContract(blockchainConfig, audienceCredentials);

        UUID ticketUUID = UUID.randomUUID();
        try {
            WalletResp favoriteMusicianWallet = walletService.getWalletOf(favoriteMusician);
            String favoriteMusicianAddress = favoriteMusicianWallet.address();
            if (concert.getStageEntity().getIsStanding()) {
                audienceContract.purchaseStandingTicket(ticketUUID, concert.getUuid(), favoriteMusicianAddress);
                log.info("Purchased standing ticket for concert {}, by audience {}", concert.getTitle(), audienceEntity.getName());
            } else {
                int row = ticketPurchaseRequest.getSeatRow().intValue();
                int col = ticketPurchaseRequest.getSeatCol().intValue();
                audienceContract.purchaseSeatingTicket(ticketUUID, concert.getUuid(), favoriteMusicianAddress, row, col);

                ConcertSeatEntity seat = new ConcertSeatEntity(ticketPurchaseRequest.getSeatRow(), ticketPurchaseRequest.getSeatCol(), concert);
                concertSeatEntityRepository.save(seat);

                log.info("Purchased seating ticket for concert {}, by audience {}", concert.getTitle(), audienceEntity.getName());
            }

            TicketEntity ticket = TicketEntity.builder()
                    .uuid(ticketUUID)
                    .userName(audienceEntity.getName())
                    .audienceEntity(audienceEntity)
                    .concertEntity(concert)
                    .status(Status.NOT_USED)
                    .seatRow(ticketPurchaseRequest.getSeatRow())
                    .seatCol(ticketPurchaseRequest.getSeatCol())
                    .favoriteMusician(favoriteMusician)
                    .build();
            ticketRepository.save(ticket);

            log.info("Ticket purchase completed for concert {}, by audience {} (Ticket UUID: {})", concert.getTitle(), audienceEntity.getName(), ticketUUID);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void approveTransfer(AppUserEntity user, UUID concertId) {
        AudienceEntity audienceEntity = audienceRepository.findByLoginId(user.getLoginId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));

        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        WalletResp audienceWallet = walletService.getWalletOf(audienceEntity);
        Credentials audienceCredentials = Credentials.create(audienceWallet.privateKey());

        MelodyTokenContract tokenContract = new MelodyTokenContract(blockchainConfig, audienceCredentials);
        tokenContract.approve(blockchainConfig.getMelodiketContractAddress(), concert.getTicketPrice());
        log.info("Approved token transfer to Melodiket contract from audience {}", audienceEntity.getName());
    }

    public Map<String, List<TicketResponse>> readMyTickets(String loginId) {
        AudienceEntity audienceEntity = audienceRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));
        List<TicketEntity> ticketEntities = audienceEntity.getTickets();

        List<TicketResponse> ticketResponses = ticketEntities.stream().map(
                (ticket) -> {
                    MusicianEntity favoriteMusician = ticket.getFavoriteMusician();
                    TicketResponse.FavoriteMusicianDto favoriteMusicianDto = new TicketResponse.FavoriteMusicianDto(favoriteMusician);
                    ConcertEntity concert = ticket.getConcertEntity();
                    StageEntity stage = concert.getStageEntity();
                    return TicketResponse.builder()
                            .userName(ticket.getUserName())
                            .ticketUuid(ticket.getUuid())
                            .concertTitle(concert.getTitle())
                            .ticketPrice(concert.getTicketPrice())
                            .seatRow(ticket.getSeatRow())
                            .seatCol(ticket.getSeatCol())
                            .posterCid(concert.getPosterCid())
                            .stageName(stage.getName())
                            .stageAddress(stage.getAddress())
                            .status(ticket.getStatus())
                            .refundAt(ticket.getRefundedAt())
                            .usedAt(ticket.getUsedAt())
                            .createdAt(ticket.getCreatedAt())
                            .startAt(concert.getStartAt())
                            .myFavoriteMusician(favoriteMusicianDto)
                            .build();
                }
        ).toList();

        return Map.of("result", ticketResponses);
    }

    public TicketResponse readTicketDetail(UUID ticketUUID) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(ticketUUID);
        TicketEntity ticket = _ticket.orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        MusicianEntity favoriteMusician = ticket.getFavoriteMusician();
        TicketResponse.FavoriteMusicianDto favoriteMusicianDto = new TicketResponse.FavoriteMusicianDto(favoriteMusician);
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
                .myFavoriteMusician(favoriteMusicianDto)
                .build();
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-useTicket')")
    public void useTicket(String loginId, AppUserEntity user, UUID ticketUUID) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(ticketUUID);
        TicketEntity ticket = _ticket.orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        if (ticket.getStatus() != Status.NOT_USED) {
            throw new HttpResponseException(ErrorDetail.TICKET_ALREADY_USED);
        }

        ConcertEntity concert = ticket.getConcertEntity();
        StageEntity stage = concert.getStageEntity();

        StageManagerEntity stageManager = stageManagerRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));

        if (stage.getOwner() != stageManager) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER);
        }

        WalletResp stageManagerWallet = walletService.getWalletOf(stageManager);
        Credentials stageManagerCredentials = Credentials.create(stageManagerWallet.privateKey());
        ManagerContract managerContract = new ManagerContract(blockchainConfig, stageManagerCredentials);

        try {
            managerContract.useTicket(concert.getUuid(), ticketUUID);
            ticket.updateStatusUsed();
            ticketRepository.save(ticket);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public TicketResponse refundTicket(UUID ticketUUID) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(ticketUUID);
        TicketEntity ticket = _ticket.orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        MusicianEntity favoriteMusician = ticket.getFavoriteMusician();
        TicketResponse.FavoriteMusicianDto favoriteMusicianDto = new TicketResponse.FavoriteMusicianDto(favoriteMusician);
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
                .myFavoriteMusician(favoriteMusicianDto)
                .build();
    }
}
