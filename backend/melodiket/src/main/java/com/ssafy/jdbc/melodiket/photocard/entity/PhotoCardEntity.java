package com.ssafy.jdbc.melodiket.photocard.entity;

import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
import com.ssafy.jdbc.melodiket.ticket.entity.TicketEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "photo_card")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PhotoCardEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private UUID uuid;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String imageCid;

    @OneToOne
    @JoinColumn(name = "ticket_id", referencedColumnName = "id")
    private TicketEntity ticketEntity;

}
