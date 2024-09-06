package com.ssafy.a310.bank.user.controller.dto;

import com.ssafy.a310.bank.user.service.domain.User;

public record LoginResp(
        User user,
        String accessToken
) {
}
