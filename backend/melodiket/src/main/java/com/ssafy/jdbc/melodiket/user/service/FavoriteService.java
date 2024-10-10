package com.ssafy.jdbc.melodiket.user.service;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.user.controller.dto.musician.MusicianResp;

import java.util.UUID;


public interface FavoriteService {

    boolean toggleLikeMusician(UUID audienceId, UUID musicianId);

    PageResponse<MusicianResp> findLikedMusiciansByAudience(UUID audienceId, CursorPagingReq pagingReq);
}
