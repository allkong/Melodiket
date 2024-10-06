package com.ssafy.jdbc.melodiket.photocard.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.photocard.dto.CidResponse;
import com.ssafy.jdbc.melodiket.photocard.dto.PhotoCardResp;
import com.ssafy.jdbc.melodiket.photocard.entity.PhotoCardEntity;
import com.ssafy.jdbc.melodiket.photocard.entity.QPhotoCardEntity;
import com.ssafy.jdbc.melodiket.photocard.repository.PhotoCardCursorRepository;
import com.ssafy.jdbc.melodiket.photocard.repository.PhotoCardRepository;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.ticket.repository.TicketRepository;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.repository.AppUserRepository;
import com.ssafy.jdbc.melodiket.user.repository.AudienceRepository;
import com.ssafy.jdbc.melodiket.webpush.service.WebPushService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoCardService {
    private final PhotoCardRepository photoCardRepository;
    private final PhotoCardCursorRepository photoCardCursorRepository;
    private final TicketRepository ticketRepository;
    private final AppUserRepository appUserRepository;
    private final AudienceRepository audienceRepository;
    private final WebPushService webPushService;
    private final RestTemplate restTemplate;

    public PageResponse<PhotoCardResp> getPhotoCards(Principal p, CursorPagingReq pagingReq) {
        QPhotoCardEntity photoCardEntity = QPhotoCardEntity.photoCardEntity;
        // 나의 티켓 가져오기
        // Boolean expression 사용
        AudienceEntity user = audienceRepository.findByLoginId(p.getName()).orElseThrow(()->new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        List<TicketEntity> tickets = ticketRepository.findAllByAudienceEntity(user);
        List<BooleanExpression> expressions = new ArrayList<>();
        for (TicketEntity ticket : tickets){
            expressions.add(ticket!=null?photoCardEntity.ticketEntity.eq(ticket):null);
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

    public PhotoCardResp getPhotoCardDetail(UUID uuid){
        return PhotoCardResp.from(photoCardRepository.findByUuid(uuid).orElseThrow(()->new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND)));
    }

    public PhotoCardResp getPhotoCardDetailForSharing(UUID uuid){
        return PhotoCardResp.fromForAll(photoCardRepository.findByUuid(uuid).orElseThrow(()->new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND)));
    }

    @Async
    @Transactional
    public void uploadImageToIPFS(Principal principal, MultipartFile image, String description, UUID ticketUUID) {
        String url = "https://j11a310.p.ssafy.io/kubo/upload";
        AppUserEntity user = appUserRepository.findByLoginId(principal.getName()).orElseThrow(()->new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", image.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            // IPFS 서버에 요청 전송
            ResponseEntity<CidResponse> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, CidResponse.class);

            // null check
            String cid = Objects.requireNonNull(responseEntity.getBody()).getCid();

            // 작업 완료 후 콜백 메서드 호출
            onUploadComplete(user,description,cid,ticketUUID);

        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    public void onUploadComplete(AppUserEntity user, String description, String cid, UUID ticketUUID){
        webPushService.sendPushNotification(user, "포토카드 업로드 완료.");
        TicketEntity ticket = ticketRepository.findByUuid(ticketUUID).orElseThrow(()-> new HttpResponseException(ErrorDetail.TICKET_NOT_FOUND));
        photoCardRepository.save(
                PhotoCardEntity.builder()
                        .uuid(UUID.randomUUID())
                        .ticketEntity(ticket)
                        .imageCid(cid)
                        .photocardOwner(user.getNickname())
//                        .favoriteMusician()
                        .build()
        );
    }

}
