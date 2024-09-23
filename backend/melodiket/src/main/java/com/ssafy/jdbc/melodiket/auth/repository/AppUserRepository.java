package com.ssafy.jdbc.melodiket.auth.repository;

import com.ssafy.jdbc.melodiket.user.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.jdbc.melodiket.user.entity.AppUser;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByUuid(UUID uuid);
    Optional<AppUser> findByLoginId(String loginId);
    boolean existsByLoginId(String loginId);
    boolean existsByNickname(String nickname);

    // 해당 Role 에 맞는 User 들 Page 조회
    Page<AppUser> findByRole(Role role, Pageable pageable);
}

