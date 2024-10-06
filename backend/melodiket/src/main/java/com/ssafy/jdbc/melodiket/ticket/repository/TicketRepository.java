package com.ssafy.jdbc.melodiket.ticket.repository;

import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import com.ssafy.jdbc.melodiket.user.entity.AudienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    Optional<TicketEntity> findByUuid(UUID uuid);
    List<TicketEntity> findAllByAudienceEntity(AudienceEntity audienceEntity);
}
