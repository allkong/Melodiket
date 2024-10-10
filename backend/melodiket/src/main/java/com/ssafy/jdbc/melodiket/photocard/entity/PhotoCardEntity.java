package com.ssafy.jdbc.melodiket.photocard.entity;

import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import jakarta.persistence.*;
import jnr.constants.platform.Local;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "photo_card")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PhotoCardEntity extends ExposableEntity {
    @Column(nullable = false)
    private String imageCid;

    private String photocardOwner;
    private String favoriteMusician;

    @OneToOne
    @JoinColumn(name = "ticket_id", referencedColumnName = "id")
    private TicketEntity ticketEntity;

}
