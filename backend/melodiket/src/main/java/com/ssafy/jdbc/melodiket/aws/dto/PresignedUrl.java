package com.ssafy.jdbc.melodiket.aws.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PresignedUrl {

    private String presigend;
    private String cdn;

}
