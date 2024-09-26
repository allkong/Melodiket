package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MusicianRepository extends JpaRepository<MusicianEntity, Long> {

    Optional<MusicianEntity> findByUuid(UUID uuid);
}
