package com.ssafy.jdbc.melodiket.user.controller.dto.musician;

import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfile;
import com.ssafy.jdbc.melodiket.user.controller.dto.stagemanager.StageManagerDetailResp;

public record MusicianDetailResp(String loginId,
                                 String role,
                                 String nickname,
                                 String description,
                                 String imageUrl,
                                 StageManagerDetailResp.Wallet wallet
) implements UserProfile {
    public record Wallet(String address, long tokenBalance) {
    }
}
