package com.ssafy.jdbc.melodiket.webpush.controller;

import com.ssafy.jdbc.melodiket.webpush.service.WebPushService;
import lombok.RequiredArgsConstructor;
import nl.martijndwars.webpush.Subscription;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/webpush")
public class WebPushController {

    private final WebPushService webPushService;

    @GetMapping("/publickey")
    public ResponseEntity<String> getPublicKey(){
        return ResponseEntity.ok(webPushService.getPubicKey());
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribe(Principal principal, @RequestBody Subscription subscription) {
        webPushService.subscribe(principal, subscription);
        return ResponseEntity.ok().build();
    }

}
