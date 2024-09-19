package com.ssafy.jdbc.melodiket.user.controller.authdto;

public record LoginResp(
        String accessToken,
        String nickname,
        String role
) {
}
