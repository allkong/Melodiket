package com.ssafy.jdbc.melodiket.concert.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.URL;

@Getter
@AllArgsConstructor
public class ConcertApproveReq {

    @URL
    String signatureImageUrl;
}
