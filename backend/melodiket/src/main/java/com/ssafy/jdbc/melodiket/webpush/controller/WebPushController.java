package com.ssafy.jdbc.melodiket.webpush.controller;

import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.webpush.controller.dto.NotificationReq;
import com.ssafy.jdbc.melodiket.webpush.controller.dto.TransactionResultResp;
import com.ssafy.jdbc.melodiket.webpush.service.WebPushService;
import lombok.RequiredArgsConstructor;
import nl.martijndwars.webpush.Subscription;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/webpush")
public class WebPushController {

    private final WebPushService webPushService;

    @GetMapping("/publickey")
    public ResponseEntity<String> getPublicKey() {
        return ResponseEntity.ok(webPushService.getPubicKey());
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribe(Principal principal, @RequestBody Subscription subscription) {
        webPushService.subscribe(principal, subscription);
        return ResponseEntity.ok().build();
    }

    //for test
    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendNotification(Authentication authentication, @RequestBody NotificationReq notificationRequest) {
        try {
            // 사용자 정보를 가져오는 부분은 가정된 내용입니다.
            AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
            if (user == null) {
                return ResponseEntity.badRequest().build();
            }

            // 알림 전송
            String operationId = UUID.randomUUID().toString();
            TransactionResultResp resp = TransactionResultResp.builder()
                    .status(TransactionResultResp.ResultStatus.SUCCESS)
                    .operationId(operationId)
                    .operation("sendNotification")
                    .targetUuid(null)
                    .build();
            webPushService.sendPushNotification(user,
                    notificationRequest.getTitle(),
                    notificationRequest.getBody(),
                    resp);

            return ResponseEntity.ok(Map.of("operationId", operationId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", e.getMessage()));
        }
    }

}
