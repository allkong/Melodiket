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
import com.ssafy.jdbc.melodiket.webpush.controller.dto.TransactionResultResp;
import com.ssafy.jdbc.melodiket.webpush.service.WebPushService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;

import java.util.*;
import java.util.stream.IntStream;

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
    private final WebPushService webPushService;

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
            if (seats.stream().anyMatch(seat -> seat.getSeatRow() == row && seat.getSeatCol() == col && !seat.getIsAvailable())) {
                throw new HttpResponseException(ErrorDetail.ALREADY_PURCHASED_SEAT);
            }
        }
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-purchaseTicket')")
    @Transactional(rollbackFor = Exception.class, timeout = 120)
    public void createTicket(String loginId, AppUserEntity user, TicketPurchaseRequest ticketPurchaseRequest, String operationId) {
        AudienceEntity audienceEntity = audienceRepository.findByLoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));
        ConcertEntity concert = concertRepository.findByUuid(ticketPurchaseRequest.getConcertId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));
        MusicianEntity favoriteMusician = musicianRepository.findByUuid(ticketPurchaseRequest.getFavoriteMusician())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        TransactionResultResp.TransactionResultRespBuilder respBuilder = TransactionResultResp.builder()
                .operationId(operationId)
                .operation("purchaseTicket");
        WalletResp audienceWallet = walletService.getWalletOf(audienceEntity);
        Credentials audienceCredentials = Credentials.create(audienceWallet.privateKey());
        AudienceContract audienceContract = new AudienceContract(blockchainConfig, audienceCredentials);

        UUID ticketUUID = UUID.randomUUID();
        try {
            WalletResp favoriteMusicianWallet = walletService.getWalletOf(favoriteMusician);
            String favoriteMusicianAddress = favoriteMusicianWallet.address();
            ConcertSeatEntity seat = null;

            if (concert.getStageEntity().getIsStanding()) {
                audienceContract.purchaseStandingTicket(ticketUUID, concert.getUuid(), favoriteMusicianAddress);
                log.info("Purchased standing ticket for concert {}, by audience {}", concert.getTitle(), audienceEntity.getName());
            } else {
                long row = ticketPurchaseRequest.getSeatRow().intValue();
                long col = ticketPurchaseRequest.getSeatCol().intValue();
                audienceContract.purchaseSeatingTicket(ticketUUID, concert.getUuid(), favoriteMusicianAddress, row, col);
                seat = concertSeatEntityRepository.findByConcertEntityAndSeatRowAndSeatCol(concert, row, col);
                log.info("좌석 구매 전 상태: row={}, col={}, isAvailable={}", seat.getSeatRow(), seat.getSeatCol(), seat.getIsAvailable());

                if (!seat.getIsAvailable()) {
                    throw new HttpResponseException(ErrorDetail.ALREADY_PURCHASED_SEAT);
                }

                seat.purchase();
                concertSeatEntityRepository.save(seat);
//                audienceContract.purchaseSeatingTicket(ticketUUID, concert.getUuid(), favoriteMusicianAddress, row, col);
//                ConcertSeatEntity seat = new ConcertSeatEntity(ticketPurchaseRequest.getSeatRow(), ticketPurchaseRequest.getSeatCol(), concert);
//                concertSeatEntityRepository.save(seat);

                log.info("Purchased seating ticket for concert {}, by audience {}", concert.getTitle(), audienceEntity.getName());
            }

            concert.decreaseRemainingTicket();
            concertRepository.save(concert);

            TicketEntity ticket = TicketEntity.builder()
                    .uuid(ticketUUID)
                    .userName(audienceEntity.getName())
                    .audienceEntity(audienceEntity)
                    .concertEntity(concert)
                    .concertSeatEntity(seat)
                    .status(Status.NOT_USED)
                    .seatRow(ticketPurchaseRequest.getSeatRow())
                    .seatCol(ticketPurchaseRequest.getSeatCol())
                    .favoriteMusician(favoriteMusician)
                    .build();
            ticketRepository.save(ticket);

            log.info("Ticket purchase completed for concert {}, by audience {} (Ticket UUID: {})", concert.getTitle(), audienceEntity.getName(), ticketUUID);

            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .targetUuid(ticketUUID.toString())
                    .build();
            String body = String.format("공연 [%s]에 대한 티켓 구매가 완료 되었습니다. 멜로디켓에서 확인해 보세요.", concert.getTitle());
            webPushService.sendPushNotification(user, "티켓 구매 완료", body, resp);
        } catch (Exception e) {
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.FAIL)
                    .targetUuid(ticketUUID.toString())
                    .build();
            String body = String.format("공연 [%s]에 대한 티켓 구매가 실패했습니다. 다시 시도해 주세요.", concert.getTitle());
            webPushService.sendPushNotification(user, "티켓 구매 실패", body, resp);
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
                    ConcertEntity concert = ticket.getConcertEntity();
                    StageEntity stage = concert.getStageEntity();
                    TicketResponse.FavoriteMusicianDto favoriteMusicianDto = new TicketResponse.FavoriteMusicianDto(favoriteMusician, concert);
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
                            .concertUuid(concert.getUuid())
                            .build();
                }
        ).toList();

        return Map.of("result", ticketResponses);
    }

    public TicketResponse readTicketDetail(UUID ticketUUID) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(ticketUUID);
        TicketEntity ticket = _ticket.orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        ConcertEntity concert = ticket.getConcertEntity();
        StageEntity stage = concert.getStageEntity();
        MusicianEntity favoriteMusician = ticket.getFavoriteMusician();
        TicketResponse.FavoriteMusicianDto favoriteMusicianDto = new TicketResponse.FavoriteMusicianDto(favoriteMusician, concert);

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
                .concertUuid(concert.getUuid())
                .build();
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-useTicket')")
    public void useTicket(String loginId, AppUserEntity user, UUID ticketUUID, String operationId) {
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

        TransactionResultResp.TransactionResultRespBuilder respBuilder = TransactionResultResp.builder()
                .operationId(operationId)
                .operation("useTicket");
        WalletResp stageManagerWallet = walletService.getWalletOf(stageManager);
        Credentials stageManagerCredentials = Credentials.create(stageManagerWallet.privateKey());
        ManagerContract managerContract = new ManagerContract(blockchainConfig, stageManagerCredentials);

        try {
            managerContract.useTicket(concert.getUuid(), ticketUUID);
            ticket.updateStatusUsed();
            ticketRepository.save(ticket);

            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .targetUuid(ticketUUID.toString())
                    .build();

            String managerBody = String.format("공연 [%s]의 티켓 사용이 완료 되었습니다. 입장을 안내해 주세요.", concert.getTitle());
            webPushService.sendPushNotification(user, "티켓 사용 완료", managerBody, resp);

            String audienceBody = String.format("공연 [%s]의 티켓 사용이 완료 되었습니다. 안내에 따라 입장해 주세요.", concert.getTitle());
            webPushService.sendPushNotification(ticket.getAudienceEntity(), "티켓 사용 완료", audienceBody, resp);
        } catch (Exception e) {
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.FAIL)
                    .targetUuid(ticketUUID.toString())
                    .build();
            String body = String.format("공연 [%s]의 티켓 사용이 실패했습니다. 다시 시도해 주세요.", concert.getTitle());
            webPushService.sendPushNotification(user, "티켓 사용 실패", body, resp);
            webPushService.sendPushNotification(ticket.getAudienceEntity(), "티켓 사용 실패", body, resp);
            throw new RuntimeException(e);
        }
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-refundTicket')")
    @Transactional(rollbackFor = Exception.class)
    public void refundTicket(String loginId, UUID ticketUUID, String operationId) {
        Optional<TicketEntity> _ticket = ticketRepository.findByUuid(ticketUUID);
        TicketEntity ticket = _ticket.orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        ConcertEntity concert = ticket.getConcertEntity();

        TransactionResultResp.TransactionResultRespBuilder respBuilder = TransactionResultResp.builder()
                .operationId(operationId)
                .operation("refundTicket");
        WalletResp audienceWallet = walletService.getWalletOf(ticket.getAudienceEntity());
        Credentials audienceCredentials = Credentials.create(audienceWallet.privateKey());
        AudienceContract audienceContract = new AudienceContract(blockchainConfig, audienceCredentials);
        try {
            audienceContract.refundTicket(concert.getUuid(), ticketUUID);

            // 상태 갱신
            ticket.updateStatusRefunded(Status.REFUNDED);
            ticketRepository.save(ticket);

            // 좌석 티켓인 경우 좌석 해제
            boolean isStanding = concert.getStageEntity().getIsStanding();
            if (!isStanding) {
                ConcertSeatEntity seat = concertSeatEntityRepository.findByConcertEntity_UuidAndSeatRowAndSeatCol(concert.getUuid(), ticket.getSeatRow(), ticket.getSeatCol());

                if (seat != null && !seat.getIsAvailable()) {
                    seat.cancel();
                    concertSeatEntityRepository.save(seat);
                    concert.getConcertSeats().add(seat);
                }
            }

            // 남은 티켓 개수 증가
            concert.increaseRemainingTicket();
            concertRepository.save(concert);
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .targetUuid(ticketUUID.toString())
                    .build();
            String body = String.format("공연 [%s]의 티켓 환불이 완료 되었습니다. 멜로디켓에서 확인해 보세요.", concert.getTitle());
            webPushService.sendPushNotification(ticket.getAudienceEntity(), "티켓 환불 완료", body, resp);
        } catch (Exception e) {
            TransactionResultResp resp = respBuilder
                    .status(TransactionResultResp.ResultStatus.FAIL)
                    .targetUuid(ticketUUID.toString())
                    .build();
            String body = String.format("공연 [%s]의 티켓 환불이 실패했습니다. 다시 시도해 주세요.", concert.getTitle());
            webPushService.sendPushNotification(ticket.getAudienceEntity(), "티켓 환불 실패", body, resp);
            throw new RuntimeException(e);
        }

    }

    public void checkTicketRefundAvailable(AppUserEntity user, UUID ticketUuid) {
        AudienceEntity audienceEntity = audienceRepository.findByLoginId(user.getLoginId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE));

        TicketEntity ticket = ticketRepository.findByUuid(ticketUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));

        if (!ticket.getAudienceEntity().equals(audienceEntity)) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_AUDIENCE);
        }

        if (ticket.getStatus() != Status.NOT_USED) {
            throw new HttpResponseException(ErrorDetail.TICKET_ALREADY_USED);
        }
    }

    public boolean[][] getSeatAvailability(UUID concertId) {
        // 공연 정보 조회
        ConcertEntity concert = concertRepository.findByUuid(concertId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.CONCERT_NOT_FOUND));

        // 스탠딩 공연일 경우 예외 처리 또는 빈 배열 반환
        if (concert.getStageEntity().getIsStanding()) {
            throw new HttpResponseException(ErrorDetail.INVALID_INPUT_VALUE, "해당 공연은 스탠딩 공연이므로 좌석 정보가 없습니다.");
        }

        // 좌석 행/열 수를 가져옴
        Long numOfRows = concert.getStageEntity().getNumOfRow();
        Long numOfCols = concert.getStageEntity().getNumOfCol();

        // 좌석 배열 초기화 (모든 좌석을 true로 초기화)
        boolean[][] seatAvailability = new boolean[Math.toIntExact(numOfRows) + 1][Math.toIntExact(numOfCols) + 1];
        IntStream.range(1, numOfRows.intValue() + 1).forEach(row ->
                IntStream.range(1, numOfCols.intValue() + 1).forEach(col -> seatAvailability[row][col] = true));

        Set<ConcertSeatEntity> seats = concert.getConcertSeats();

        // 좌석 정보에 따라 구매 불가능 상태를 업데이트 (구매된 좌석을 false로 설정)
        seats.forEach(seat -> {
            int row = seat.getSeatRow().intValue();
            int col = seat.getSeatCol().intValue();
            log.info("좌석 상태 업데이트: row={}, col={}, isAvailable={}", row, col, seat.getIsAvailable());

            // 올바른 row, col 값으로 seatAvailability 배열을 업데이트
            if (row >= 1 && row <= numOfRows && col >= 1 && col <= numOfCols) {
                seatAvailability[row][col] = !seat.getIsAvailable();
            }
        });

        return seatAvailability;
    }
}
