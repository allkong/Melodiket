package com.ssafy.jdbc.melodiket.stage.dto;

import com.ssafy.jdbc.melodiket.common.page.PageInfoCursor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StageCursorPageResponse {
    PageInfoCursor pageInfo;
    List<StageInfoResponse> result;
}
