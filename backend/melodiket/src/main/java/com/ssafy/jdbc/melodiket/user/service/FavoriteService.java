package com.ssafy.jdbc.melodiket.user.service;

import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import org.springframework.data.domain.Pageable;

import java.util.UUID;


public interface FavoriteService {

    boolean toggleLikeMusician(UUID audienceId, UUID musicianId);
    PageResponse<UserProfileResp> findLikedMusiciansByAudience(UUID audienceId, Pageable pageable);
}
