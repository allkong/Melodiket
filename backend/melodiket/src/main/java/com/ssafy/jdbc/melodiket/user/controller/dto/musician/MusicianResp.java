package com.ssafy.jdbc.melodiket.user.controller.dto.musician;

import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfile;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.favorite.FavoriteMusicianEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.UUID;

public record MusicianResp(UUID uuid,
                           String loginId,
                           String role,
                           String nickname,
                           String description,
                           LocalDateTime registeredAt,
                           String imageUrl,
                           long likeCount,
                           boolean isLike
) implements UserProfile {
    public static MusicianResp from(MusicianEntity entity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean _isLike = false;
        if (authentication.getAuthorities().stream().anyMatch(grantedAuthority -> "ROLE_AUDIENCE".equals(grantedAuthority.getAuthority()))) {
            AudienceEntity user = (AudienceEntity) authentication.getPrincipal();
            for (FavoriteMusicianEntity f : entity.getFavoriteMusicians()){
                if ((long) f.getAudienceEntity().getId() == user.getId()) {
                    _isLike = true;
                    break;
                }
            }
        }
        return new MusicianResp(
                entity.getUuid(),
                entity.getLoginId(),
                entity.getRole().getAuthority(),
                entity.getNickname(),
                entity.getDescription(),
                entity.getRegisteredAt(),
                entity.getImageUrl(),
                entity.getLikeCount(),
                _isLike
        );
    }
}
