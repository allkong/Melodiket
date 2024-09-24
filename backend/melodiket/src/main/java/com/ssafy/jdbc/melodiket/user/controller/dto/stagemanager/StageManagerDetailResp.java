package com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager;

import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfile;

public record StageManagerDetailResp(
        String loginId,
        String role,
        String nickname,
        String description,
        String imageUrl,
        Wallet wallet
) implements UserProfile {
    public record Wallet(String address, long tokenBalance) {}
}
