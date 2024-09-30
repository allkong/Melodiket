package com.ssafy.jdbc.melodiket.user.controller.dto.musician;

import com.ssafy.jdbc.melodiket.common.page.PageInfo;

import java.util.List;

public record MusicianResp(PageInfo pageInfo, List<MusicianDetailResp> result) {
}
