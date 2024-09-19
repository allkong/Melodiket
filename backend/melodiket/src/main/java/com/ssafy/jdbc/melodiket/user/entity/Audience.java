package com.ssafy.jdbc.melodiket.user.entity;

import com.ssafy.jdbc.melodiket.ticket.entity.Ticket;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "audience")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Audience extends AppUser {
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private AppUser user;

    private String description;

    private String imageUrl;

    @OneToMany(mappedBy = "audience", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets = new ArrayList<>();

}
