package com.ssafy.jdbc.melodiket.photocard.controller;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.photocard.controller.dto.PhotoCardCreateReq;
import com.ssafy.jdbc.melodiket.photocard.dto.PhotoCardResp;
import com.ssafy.jdbc.melodiket.photocard.service.PhotoCardService;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.webpush.controller.dto.AcceptedResp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/photo-cards")
public class PhotoCardController {
    private final PhotoCardService photoCardService;

    @PostMapping
    public ResponseEntity<AcceptedResp> uploadImage(
            Authentication authentication,
            @Valid @RequestBody PhotoCardCreateReq req
    ) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        photoCardService.checkPhotoCardMintingAvailable(user, req.ticketUuid());
        String operationId = UUID.randomUUID().toString();
        photoCardService.mintPhotoCard(user.getLoginId(), user, req.imageCid(), req.ticketUuid(), operationId);
        return ResponseEntity.accepted().body(new AcceptedResp(operationId));
    }

    @GetMapping("/me")
    public ResponseEntity<PageResponse<PhotoCardResp>> getPhotoCards(
            Principal principal,
            CursorPagingReq pagingReq
    ) {
        PageResponse<PhotoCardResp> photoCards = photoCardService.getPhotoCards(principal, pagingReq);
        return ResponseEntity.ok(photoCards);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<PhotoCardResp> getPhotoCardDetail(
            @PathVariable UUID uuid
    ) {
        PhotoCardResp photoCardResp = photoCardService.getPhotoCardDetail(uuid);
        return ResponseEntity.ok(photoCardResp);
    }

    @GetMapping("/{uuid}/sharing")
    public ResponseEntity<PhotoCardResp> getPhotoCardDetailForSharing(
            @PathVariable UUID uuid
    ) {
        PhotoCardResp photoCardResp = photoCardService.getPhotoCardDetailForSharing(uuid);
        return ResponseEntity.ok(photoCardResp);
    }
}
