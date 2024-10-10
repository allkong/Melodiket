package com.ssafy.jdbc.melodiket.webpush.repository;

import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.webpush.entity.SubscriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebPushRepository extends JpaRepository<SubscriptionEntity, Long> {
}
