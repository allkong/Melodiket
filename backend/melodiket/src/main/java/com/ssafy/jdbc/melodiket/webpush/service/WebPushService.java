package com.ssafy.jdbc.melodiket.webpush.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.repository.AppUserRepository;
import com.ssafy.jdbc.melodiket.webpush.entity.SubscriptionEntity;
import com.ssafy.jdbc.melodiket.webpush.repository.WebPushRepository;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.GeneralSecurityException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class WebPushService {
    private final PushService pushService;
    private final WebPushRepository webPushRepository;
    private final AppUserRepository appUserRepository;
    private final String publicKey;

    public WebPushService(@Value("${vapid.public.key}") String publicKey,
                          @Value("${vapid.private.key}") String privateKey,
                          WebPushRepository webPushRepository,
                          AppUserRepository appUserRepository) throws GeneralSecurityException {
        this.pushService = new PushService();
        this.pushService.setPublicKey(publicKey);
        this.publicKey = publicKey;
        this.pushService.setPrivateKey(privateKey);
        this.webPushRepository = webPushRepository;
        this.appUserRepository = appUserRepository;
    }

    public String getPubicKey() {
        return publicKey;
    }

    public void subscribe(Principal user, Subscription subscription) {
        AppUserEntity appUserEntity = appUserRepository
                .findByLoginId(user.getName()).orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        webPushRepository.save(
                SubscriptionEntity.builder()
                        .endpoint(subscription.endpoint)
                        .p256dhKey(subscription.keys.p256dh)
                        .auth(subscription.keys.auth)
                        .appUserEntity(appUserEntity)
                        .build()
        );
    }

    @Async
    public void sendPushNotification(AppUserEntity user, String title, String body, Map<String, String> data) {
        List<SubscriptionEntity> subscriptions = user.getSubscriptionEntities();
        ObjectMapper objectMapper = new ObjectMapper();  // JSON 직렬화를 위한 ObjectMapper 사용
        for (SubscriptionEntity subscriptionEntity : subscriptions) {
            try {
                // Subscription 객체 생성
                Subscription subscription = new Subscription(
                        subscriptionEntity.getEndpoint(),
                        new Subscription.Keys(
                                subscriptionEntity.getP256dhKey(),
                                subscriptionEntity.getAuth()
                        )
                );

                // 상세한 알림 메시지를 Map 형태로 생성
                Map<String, Object> notificationMessage = new HashMap<>();
                notificationMessage.put("title", title);
                notificationMessage.put("body", body);
                notificationMessage.put("data", data);  // 추가 데이터를 포함

                // JSON 직렬화
                String message = objectMapper.writeValueAsString(notificationMessage);

                // Notification 객체 생성
                Notification notification = new Notification(subscription, message);

                // 알림 전송
                pushService.send(notification);
            } catch (Exception e) {
                log.error(e.getMessage());
            }
        }
    }

    @Transactional
    public void initiatePushNotification(AppUserEntity user, String title, String body, Map<String, String> data) {
        // 컬렉션을 트랜잭션 내에서 초기화
        user.getSubscriptionEntities().size();

        // 비동기 메서드 호출
        sendPushNotification(user, title, body, data);
    }
}
