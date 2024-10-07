package com.ssafy.jdbc.melodiket.common.exception;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
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
                ADDITIONAL_INFO, e.getAdditionalInfo() == null ? "" : e.getAdditionalInfo()
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
