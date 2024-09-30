package com.ssafy.jdbc.melodiket.user.controller.dto;


import java.time.LocalDateTime;

public record UserProfileResp(
        String loginId,
        String role,
        String nickname,
        String description,
        LocalDateTime dateTime,
        String imageUrl,
        WalletResp wallet
) implements UserProfile {
}
