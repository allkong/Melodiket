package com.ssafy.jdbc.melodiket.concert.controller.dto;

import com.ssafy.jdbc.melodiket.common.page.PageInfoCursor;

import java.util.List;

public record FooConcertResp(
        PageInfoCursor pageInfo,          // 커서 기반 페이지네이션 정보
        List<ConcertResp> result    // 공연 상세 정보 리스트
) {
}
