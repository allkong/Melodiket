package com.ssafy.a310.bank.common.exception;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
    private static final String DETAIL_CODE = "detailCode";
    private static final String DETAIL_MESSAGE = "detailMessage";
    private static final String ADDITIONAL_INFO = "additionalInfo";

    @ExceptionHandler(HttpResponseException.class)
    public ResponseEntity<Map<String, Object>> handleResponseException(HttpResponseException e) {
        ErrorDetail errorDetail = e.getErrorDetail();
        Map<String, Object> body = Map.of(
                DETAIL_CODE, errorDetail.getDetailCode(),
                DETAIL_MESSAGE, errorDetail.getDetailMessage(),
                ADDITIONAL_INFO, e.getAdditionalInfo() == null ? Map.of() : e.getAdditionalInfo()
        );
        return ResponseEntity.status(errorDetail.getStatus()).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException e) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put(DETAIL_CODE, ErrorDetail.INVALID_INPUT_VALUE.getDetailCode());
        responseBody.put(DETAIL_MESSAGE, ErrorDetail.INVALID_INPUT_VALUE.getDetailMessage());

        Map<String, String> errors = e.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fieldError -> fieldError.getDefaultMessage() != null ? fieldError.getDefaultMessage() : "Invalid value"
                ));
        responseBody.put(ADDITIONAL_INFO, errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException e) {
        Map<String, String> body = Map.of(
                DETAIL_CODE, ErrorDetail.INVALID_INPUT_VALUE.getDetailCode(),
                DETAIL_MESSAGE, e.getMessage()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        Map<String, String> body = Map.of(
                DETAIL_CODE, ErrorDetail.INVALID_INPUT_VALUE.getDetailCode(),
                DETAIL_MESSAGE, "Request body is required."
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Map<String, String>> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        Map<String, String> body = Map.of(
                DETAIL_CODE, ErrorDetail.METHOD_NOT_ALLOWED.getDetailCode(),
                DETAIL_MESSAGE, ErrorDetail.METHOD_NOT_ALLOWED.getDetailMessage()
        );
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception e) {
        log.error("Exception: ", e);
        Map<String, String> body = Map.of(
                DETAIL_CODE, ErrorDetail.INTERNAL_SERVER_ERROR.getDetailCode(),
                DETAIL_MESSAGE, ErrorDetail.INTERNAL_SERVER_ERROR.getDetailMessage()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
