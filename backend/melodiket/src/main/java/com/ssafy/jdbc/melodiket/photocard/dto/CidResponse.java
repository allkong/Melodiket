package com.ssafy.jdbc.melodiket.photocard.dto;

import lombok.ToString;

@ToString
public class CidResponse {
    private String cid;

    // 기본 생성자
    public CidResponse() {}

    // Getter
    public String getCid() {
        return cid;
    }

    // Setter
    public void setCid(String cid) {
        this.cid = cid;
    }
}