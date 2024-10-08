package com.ssafy.jdbc.melodiket.concert.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ConcertApproveReq {

    @URL
    String signatureImageUrl;
}
