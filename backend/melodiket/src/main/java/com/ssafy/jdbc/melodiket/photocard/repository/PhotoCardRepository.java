package com.ssafy.jdbc.melodiket.photocard.repository;

import com.ssafy.jdbc.melodiket.photocard.entity.PhotoCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PhotoCardRepository extends JpaRepository<PhotoCardEntity, Long> {
    Optional<PhotoCardEntity> findByUuid(UUID uuid);
}
