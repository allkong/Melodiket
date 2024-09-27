package com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager;

import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfile;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;

public record StageManagerResp(
        String loginId,
        String role,
        String nickname,
        String description,
        String imageUrl,
        WalletResp wallet
) implements UserProfile {
    public static StageManagerResp from(StageManagerEntity entity) {
        return new StageManagerResp(
                entity.getLoginId(),
                entity.getRole().name(),
                entity.getNickname(),
                entity.getDescription(),
                entity.getImageUrl(),
                null
        );
    }
}
