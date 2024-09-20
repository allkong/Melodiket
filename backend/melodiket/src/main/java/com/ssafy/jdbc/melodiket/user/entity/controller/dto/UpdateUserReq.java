package com.ssafy.jdbc.melodiket.user.entity.controller.dto;

import java.util.Optional;

public record UpdateUserReq(
        Optional<String> nickname,
        Optional<String> description
) {}
