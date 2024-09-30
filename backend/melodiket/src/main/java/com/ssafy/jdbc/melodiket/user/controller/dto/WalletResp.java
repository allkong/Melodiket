package com.ssafy.jdbc.melodiket.user.controller.dto;

public record WalletResp(
        String address,
        long tokenBalance
) {
}
