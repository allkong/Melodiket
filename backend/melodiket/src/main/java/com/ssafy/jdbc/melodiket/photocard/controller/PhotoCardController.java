package com.ssafy.jdbc.melodiket.photocard.controller;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.photocard.dto.PhotoCardResp;
import com.ssafy.jdbc.melodiket.photocard.service.PhotoCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/photo-cards")
public class PhotoCardController {
    private final PhotoCardService photoCardService;

    @PostMapping
    public ResponseEntity<String> uploadImage(
            Principal principal,
            @RequestParam("image") MultipartFile image,
            @RequestParam("description") String description,
            @RequestParam("ticketUUID") UUID uuid
    ) {
        photoCardService.uploadImageToIPFS(principal, image, description, uuid);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("이미지 업로드 요청 완료");
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
