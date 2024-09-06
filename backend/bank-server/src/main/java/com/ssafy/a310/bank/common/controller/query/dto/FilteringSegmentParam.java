package com.ssafy.a310.bank.common.controller.query.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class FilteringSegmentParam {
    private final List<String> segment;

    public FilteringSegmentParam(List<String> segment) {
        this.segment = segment == null ? List.of() : segment;
    }
}
