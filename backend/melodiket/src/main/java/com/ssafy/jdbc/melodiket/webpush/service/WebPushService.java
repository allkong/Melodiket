package com.ssafy.jdbc.melodiket.webpush.service;

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
import java.util.List;

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

    public void subscribe(Principal user, Subscription subscription){
        AppUserEntity appUserEntity = appUserRepository
                .findByLoginId(user.getName()).orElseThrow(()-> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
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
    public void sendPushNotification(AppUserEntity user, String message) {
        List<SubscriptionEntity> subscriptions = user.getSubscriptionEntities();
        for (SubscriptionEntity subscriptionEntity: subscriptions){
            try {
                Subscription subscription = new Subscription(
                        subscriptionEntity.getEndpoint()
                        , new Subscription.Keys(
                        subscriptionEntity.getP256dhKey(),
                        subscriptionEntity.getAuth()
                )
                );
                Notification notification = new Notification(
                        subscription,
                        message
                );
                pushService.send(notification);
            }catch (Exception e){
                log.error(e.getMessage());
            }
        }
    }

    @Transactional
    public void initiatePushNotification(AppUserEntity user, String message) {
        // 컬렉션을 트랜잭션 내에서 초기화
        user.getSubscriptionEntities().size();

        // 비동기 메서드 호출
        sendPushNotification(user, message);
    }
}
