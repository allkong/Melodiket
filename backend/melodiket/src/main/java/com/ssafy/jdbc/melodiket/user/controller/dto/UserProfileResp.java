package com.ssafy.jdbc.melodiket.user.controller.dto;


import java.time.LocalDateTime;

public record UserProfileResp(
        String loginId,
        String role,
        String nickname,
        String description,
        LocalDateTime dateTime,
        String imageUrl,
        Wallet wallet
) implements UserProfile {
    public record Wallet(String address, long tokenBalance) {}
}
