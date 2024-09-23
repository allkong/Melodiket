package com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager;

import com.ssafy.jdbc.melodiket.common.page.PageInfo;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;

import java.util.List;

public record StageManagerResp(PageInfo pageInfo, List<UserProfileResp> result) {}
