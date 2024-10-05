package com.ssafy.jdbc.melodiket.concert.repository;

import com.ssafy.jdbc.melodiket.concert.entity.ApprovalStatus;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertEntity;
import com.ssafy.jdbc.melodiket.concert.entity.ConcertParticipantMusicianEntity;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConcertParticipantMusicianRepository extends JpaRepository<ConcertParticipantMusicianEntity, Long> {
    Optional<ConcertParticipantMusicianEntity> findByConcertEntityAndMusicianEntity(ConcertEntity concertEntity, MusicianEntity musicianEntity);

    List<ConcertParticipantMusicianEntity> findAllByConcertEntityAndApprovalStatus(ConcertEntity concertEntity, ApprovalStatus approvalStatus);
}
