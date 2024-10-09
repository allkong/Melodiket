package com.ssafy.jdbc.melodiket.user.controller.dto;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import lombok.Data;

@Data
public class MusicianCursorPagingReq extends CursorPagingReq {
    private String name;
}
