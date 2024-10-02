package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MusicianRepository extends JpaRepository<MusicianEntity, Long> {

    Optional<MusicianEntity> findByUuid(UUID uuid);

    @Query("SELECT m FROM MusicianEntity m WHERE m.uuid IN :uuids")
    List<MusicianEntity> findAllByUuidIn(@Param("uuids") List<UUID> uuids);
}

