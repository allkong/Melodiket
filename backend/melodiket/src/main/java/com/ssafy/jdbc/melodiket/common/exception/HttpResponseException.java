package com.ssafy.jdbc.melodiket.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@RequiredArgsConstructor
@Getter
public class HttpResponseException extends RuntimeException {
    private final ErrorDetail errorDetail;
    private final Serializable additionalInfo;

    public HttpResponseException(ErrorDetail errorDetail) {
        this.errorDetail = errorDetail;
        this.additionalInfo = null;
    }
}
