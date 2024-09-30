package com.ssafy.jdbc.melodiket.photocard.entity;

import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "photo_card")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PhotoCardEntity extends ExposableEntity {
    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String imageCid;

    @OneToOne
    @JoinColumn(name = "ticket_id", referencedColumnName = "id")
    private TicketEntity ticketEntity;

}
