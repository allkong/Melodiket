package com.ssafy.jdbc.melodiket.concert.controller.dto;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import lombok.Data;

@Data
public class ConcertCursorPagingReq extends CursorPagingReq {
    String[] status;
}
