package com.ssafy.jdbc.melodiket.user.controller.dto.musician;

import com.ssafy.jdbc.melodiket.concert.entity.ApprovalStatus;

import java.util.UUID;

public record MusicianInfo(
        UUID musicianUuid,
        String name,
        String imageUrl,
        ApprovalStatus approvalStatus
) {}