package com.ssafy.jdbc.melodiket.auth.controller.dto;

public record LoginResp(
        String accessToken,
        String nickname,
        String role
) {
}
