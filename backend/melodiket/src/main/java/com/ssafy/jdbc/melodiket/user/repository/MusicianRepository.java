package com.ssafy.jdbc.melodiket.user.repository;

import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicianRepository extends JpaRepository<MusicianEntity, Long> {
}
