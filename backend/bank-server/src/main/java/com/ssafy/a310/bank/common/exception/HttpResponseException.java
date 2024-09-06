package com.ssafy.a310.bank.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Getter
@RequiredArgsConstructor
public class HttpResponseException extends RuntimeException {
    private final ErrorDetail errorDetail;
    private final Serializable additionalInfo;

    public HttpResponseException(ErrorDetail errorDetail) {
        this.errorDetail = errorDetail;
        this.additionalInfo = null;
    }
}
