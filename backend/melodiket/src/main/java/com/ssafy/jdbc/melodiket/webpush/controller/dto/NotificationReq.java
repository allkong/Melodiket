package com.ssafy.jdbc.melodiket.webpush.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public class NotificationReq {
    private String title;
    private String body;
    private Map<String, String> data; // 추가 데이터를 위한 필드
}
