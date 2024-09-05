package com.ssafy.a310.bank.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * 에러 상세 코드 규칙
 * 1. E로 시작
 * 2. 맨 앞 세 자리는 HTTP 상태 코드
 * 3. 네 번째 자리가 0이면 여러 API에 걸쳐 흔히 발생할 수 있는 에러 (입력값 오류, 권한 오류 등)
 * 4. 네 번째 자리가 1이면 해당 API에서만 발생할 수 있는 에러
 */
@Getter
@RequiredArgsConstructor
public enum ErrorDetail {
    // 400 Bad Request
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "E400000", "Bad Request"),
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "E400001", "Invalid Input Value"),
    // 401 Unauthorized
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "E401000", "Unauthorized"),
    UNKNOWN_USER_INFO(HttpStatus.UNAUTHORIZED, "E401100", "Unknown User Information"),
    // 403 Forbidden
    FORBIDDEN(HttpStatus.FORBIDDEN, "E403000", "Forbidden"),
    // 404 Not Found
    NOT_FOUND(HttpStatus.NOT_FOUND, "E404000", "Not Found"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "E404101", "User Not Found"),
    // 405 Method Not Allowed
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "E405000", "Method Not Allowed"),
    // 409 Conflict
    CONFLICT(HttpStatus.CONFLICT, "E409000", "Conflict"),
    ALREADY_EXIST_USER(HttpStatus.CONFLICT, "E409100", "Already Exist User"),
    LACK_OF_BALANCE(HttpStatus.CONFLICT, "E409101", "Lack of Balance"),
    MAX_ACCOUNT_COUNT(HttpStatus.CONFLICT, "E409102", "Max Account Count"),
    // 500 Internal Server Error
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E500000", "Internal Server Error");

    private final HttpStatus status;
    private final String detailCode;
    private final String detailMessage;
}
