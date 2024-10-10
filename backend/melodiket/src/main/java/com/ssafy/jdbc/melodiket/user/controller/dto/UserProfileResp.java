package com.ssafy.jdbc.melodiket.user.controller.dto;


import java.time.LocalDateTime;
import java.util.UUID;

public record UserProfileResp(
        UUID uuid,
        String loginId,
        String role,
        String nickname,
        String description,
        LocalDateTime dateTime,
        String imageUrl
) implements UserProfile {
}
