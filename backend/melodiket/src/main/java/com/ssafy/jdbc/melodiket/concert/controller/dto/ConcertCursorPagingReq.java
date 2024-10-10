package com.ssafy.jdbc.melodiket.concert.controller.dto;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import lombok.Data;

@Data
public class ConcertCursorPagingReq extends CursorPagingReq {
    private String title;             // 공연 제목 필터
    private String[] status;          // 공연 상태 필터
}
