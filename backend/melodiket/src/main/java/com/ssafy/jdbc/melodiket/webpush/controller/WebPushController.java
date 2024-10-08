package com.ssafy.jdbc.melodiket.webpush.controller;

import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.webpush.controller.dto.NotificationReq;
import com.ssafy.jdbc.melodiket.webpush.service.WebPushService;
import lombok.RequiredArgsConstructor;
import nl.martijndwars.webpush.Subscription;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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
    public ResponseEntity<String> sendNotification(Authentication authentication, @RequestBody NotificationReq notificationRequest) {
        try {
            // 사용자 정보를 가져오는 부분은 가정된 내용입니다.
            AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
            if (user == null) {
                return ResponseEntity.badRequest().body("Invalid user ID");
            }

            // 알림 전송
            webPushService.sendPushNotification(user,
                    notificationRequest.getTitle(),
                    notificationRequest.getBody(),
                    notificationRequest.getData());

            return ResponseEntity.ok("Notification sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending notification: " + e.getMessage());
        }
    }

}
