package com.ssafy.jdbc.melodiket.photocard.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.common.service.redis.DistributedLock;
import com.ssafy.jdbc.melodiket.photocard.dto.PhotoCardResp;
import com.ssafy.jdbc.melodiket.photocard.entity.PhotoCardEntity;
import com.ssafy.jdbc.melodiket.photocard.entity.QPhotoCardEntity;
import com.ssafy.jdbc.melodiket.photocard.repository.PhotoCardCursorRepository;
import com.ssafy.jdbc.melodiket.photocard.repository.PhotoCardRepository;
import com.ssafy.jdbc.melodiket.photocard.service.contract.PhotoCardContract;
import com.ssafy.jdbc.melodiket.ticket.entity.Status;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.ticket.repository.TicketRepository;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.repository.AudienceRepository;
import com.ssafy.jdbc.melodiket.wallet.service.WalletService;
import com.ssafy.jdbc.melodiket.webpush.service.WebPushService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.web3j.crypto.Credentials;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoCardService {
    private final PhotoCardRepository photoCardRepository;
    private final PhotoCardCursorRepository photoCardCursorRepository;
    private final TicketRepository ticketRepository;
    private final AudienceRepository audienceRepository;
    private final WalletService walletService;
    private final WebPushService webPushService;
    private final RestTemplate restTemplate;
    private final BlockchainConfig blockchainConfig;

    public PageResponse<PhotoCardResp> getPhotoCards(Principal p, CursorPagingReq pagingReq) {
        QPhotoCardEntity photoCardEntity = QPhotoCardEntity.photoCardEntity;
        // 나의 티켓 가져오기
        // Boolean expression 사용
        AudienceEntity user = audienceRepository.findByLoginId(p.getName()).orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        List<TicketEntity> tickets = ticketRepository.findAllByAudienceEntity(user);
        List<BooleanExpression> expressions = new ArrayList<>();
        for (TicketEntity ticket : tickets) {
            expressions.add(ticket != null ? photoCardEntity.ticketEntity.eq(ticket) : null);
        }

        BooleanExpression combinedExpression = null;
        for (BooleanExpression expression : expressions) {
            if (combinedExpression == null) {
                combinedExpression = expression;
            } else {
                combinedExpression = combinedExpression.or(expression);
            }
        }

        return photoCardCursorRepository.findWithPagination(pagingReq, PhotoCardResp::from, combinedExpression);
    }

    public PhotoCardResp getPhotoCardDetail(UUID uuid) {
        return PhotoCardResp.from(photoCardRepository.findByUuid(uuid).orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND)));
    }

    public PhotoCardResp getPhotoCardDetailForSharing(UUID uuid) {
        return PhotoCardResp.fromForAll(photoCardRepository.findByUuid(uuid).orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND)));
    }

    public void checkPhotoCardMintingAvailable(AppUserEntity user, UUID ticketUuid) {
        AudienceEntity audience = audienceRepository.findByLoginId(user.getLoginId()).orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        TicketEntity ticket = ticketRepository.findByUuid(ticketUuid).orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));

        if (!ticket.getAudienceEntity().equals(audience)) {
            throw new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND);
        }

        if (ticket.getStatus() != Status.USED) {
            throw new HttpResponseException(ErrorDetail.TICKET_NOT_USED);
        }
    }

    @Async
    @DistributedLock(key = "#loginId.concat('-uploadImageToIPFS')")
    @Transactional(rollbackFor = Exception.class)
    public void uploadImageToIPFS(String loginId, AppUserEntity user, String imageCid, UUID ticketUUID) {
        WalletResp wallet = walletService.getWalletOf(user.getUuid());
        Credentials credentials = Credentials.create(wallet.privateKey());
        PhotoCardContract photoCardContract = new PhotoCardContract(blockchainConfig, credentials);
        
        UUID uuid = UUID.randomUUID();
        try {
            photoCardContract.createPhotoCard(uuid.toString(), ticketUUID.toString(), wallet.address(), imageCid);
            onUploadComplete(uuid, user, imageCid, ticketUUID);
        } catch (Exception e) {
            log.error("Error occurred while uploading image to IPFS: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public void onUploadComplete(UUID uuid, AppUserEntity user, String cid, UUID ticketUUID) {
        webPushService.initiatePushNotification(user, "포토카드 업로드 완료.");
        TicketEntity ticket = ticketRepository.findByUuid(ticketUUID).orElseThrow(() -> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        photoCardRepository.save(
                PhotoCardEntity.builder()
                        .uuid(uuid)
                        .ticketEntity(ticket)
                        .imageCid(cid)
                        .photocardOwner(user.getNickname())
                        .favoriteMusician(ticket.getFavoriteMusician().getNickname())
                        .build()
        );
    }

}