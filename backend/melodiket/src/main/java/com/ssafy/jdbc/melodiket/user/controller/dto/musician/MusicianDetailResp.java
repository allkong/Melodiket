package com.ssafy.jdbc.melodiket.user.controller.dto.musician;

import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfile;

import java.time.LocalDateTime;
import java.util.UUID;

public record MusicianDetailResp(UUID uuid,
                                 String loginId,
                                 String role,
                                 String nickname,
                                 String description,
                                 LocalDateTime registeredAt,
                                 String imageUrl,
                                 long likeCount,
                                 Wallet wallet
) implements UserProfile {
    public record Wallet(String address, long tokenBalance) {
    }
}
