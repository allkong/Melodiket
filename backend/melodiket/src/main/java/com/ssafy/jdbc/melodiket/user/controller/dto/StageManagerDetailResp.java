package com.ssafy.jdbc.melodiket.user.controller.dto;

public record StageManagerDetailResp(
        String loginId,
        String role,
        String nickname,
        String description,
        String imageUrl,
        WalletInfo wallet
) implements UserProfile {
    public record WalletInfo(String address, long tokenBalance) {}
}
