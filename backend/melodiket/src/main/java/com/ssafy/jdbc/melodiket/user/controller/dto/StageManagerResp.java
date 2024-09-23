package com.ssafy.jdbc.melodiket.user.controller.dto;

import com.ssafy.jdbc.melodiket.common.page.PageInfo;

import java.util.List;

public record StageManagerResp(PageInfo pageInfo, List<UserProfileResp> result) {}
