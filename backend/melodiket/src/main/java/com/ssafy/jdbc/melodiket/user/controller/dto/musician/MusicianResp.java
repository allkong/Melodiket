package com.ssafy.jdbc.melodiket.user.controller.dto.musician;

import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfile;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;

import java.time.LocalDateTime;
import java.util.UUID;

public record MusicianResp(UUID uuid,
                           String loginId,
                           String role,
                           String nickname,
                           String description,
                           LocalDateTime registeredAt,
                           String imageUrl,
                           long likeCount,
                           WalletResp wallet
) implements UserProfile {
    public static MusicianResp from(MusicianEntity entity) {
        return new MusicianResp(
                entity.getUuid(),
                entity.getLoginId(),
                entity.getRole().getAuthority(),
                entity.getNickname(),
                entity.getDescription(),
                entity.getRegisteredAt(),
                entity.getImageUrl(),
                entity.getLikeCount(),
                null
        );
    }
}
