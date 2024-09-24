package com.ssafy.jdbc.melodiket.auth.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum JwtType {
    // API 인증 토큰
    AUTH_ACCESS("AUTH_ACCESS"),
    // API 인증 토큰 갱신 토큰
    AUTH_REFRESH("AUTH_REFRESH");

    public static final String TYPE_KEY = "type";

    private final String value;
}
