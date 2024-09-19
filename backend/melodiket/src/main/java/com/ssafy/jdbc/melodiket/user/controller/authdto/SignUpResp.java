package com.ssafy.jdbc.melodiket.user.controller.authdto;

import com.ssafy.jdbc.melodiket.user.entity.Role;

import java.util.UUID;

public record SignUpResp(
        Long id,
        UUID uuid,
        String loginId,
        String nickname,
        Role role,
        String description
) {
}
