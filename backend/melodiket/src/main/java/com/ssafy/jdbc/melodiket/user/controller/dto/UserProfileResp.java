package com.ssafy.jdbc.melodiket.user.controller.dto;

public record UserProfileResp(
        String loginId,
        String role,
        String nickname,
        String description
) {
}
