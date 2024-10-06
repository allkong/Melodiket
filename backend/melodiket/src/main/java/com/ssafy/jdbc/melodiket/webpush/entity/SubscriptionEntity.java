package com.ssafy.jdbc.melodiket.webpush.entity;


import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Table(name = "subscription")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SubscriptionEntity extends BaseEntity {
    @Lob
    private String endpoint;

    @Lob
    private String p256dhKey;

    @Lob
    private String auth;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUserEntity appUserEntity;
}