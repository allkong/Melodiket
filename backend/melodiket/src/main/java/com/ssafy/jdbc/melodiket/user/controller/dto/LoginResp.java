package com.ssafy.jdbc.melodiket.user.controller.dto;

public record LoginResp(
        String accessToken,
        String nickname,
        String role
) {
}
