package com.ssafy.jdbc.melodiket.common.exception;

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
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "E400001", "입력 값이 유효하지 않습니다."),
    ERROR_ON_BANK_API(HttpStatus.BAD_REQUEST, "E400002", "Unexpected error from bank API"),
    ALREADY_APPROVED(HttpStatus.BAD_REQUEST, "E400007", "이미 승인된 공연입니다."),
    ALREADY_DENIED(HttpStatus.BAD_REQUEST, "E400008", "이미 거절된 공연입니다."),
    ALREADY_CANCELED(HttpStatus.BAD_REQUEST, "E400009", "이미 취소된 공연입니다."),
    // 401 Unauthorized
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "E401000", "Unauthorized"),
    LOGIN_FAILED(HttpStatus.UNAUTHORIZED, "E401001", "아이디 또는 비밀번호 오류입니다."),
    NOT_VALID_ACCOUNT_CERTIFICATION(HttpStatus.UNAUTHORIZED, "E401002", "Given secret is invalid or you don't have permission to access this account."),
    CERTIFICATION_EXPIRED(HttpStatus.UNAUTHORIZED, "E401003", "Certification is expired."),
    // 403 Forbidden
    FORBIDDEN(HttpStatus.FORBIDDEN, "E403000", "Forbidden"),
    FORBIDDEN_AUDIENCE(HttpStatus.FORBIDDEN, "E403001", "Audience 권한이 아닙니다."),
    FORBIDDEN_MUSICIAN(HttpStatus.FORBIDDEN, "E403002", "Musician 권한이 아닙니다."),
    FORBIDDEN_STAGE_MANAGER(HttpStatus.FORBIDDEN, "E403003", "Stage_Manager 권한이 아닙니다."),
    // 404 Not Found
    NOT_FOUND(HttpStatus.NOT_FOUND, "E404000", "Not Found"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "E404001", "존재하지 않는 유저정보 입니다."),
    MUSICIAN_NOT_FOUND(HttpStatus.NOT_FOUND, "E404002", "존재하지 않는 뮤지션 정보 입니다."),
    STAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "E404003", "존재하지 않는 공연장 정보 입니다."),
    ACCOUNT_CERTIFICATION_NOT_FOUND(HttpStatus.NOT_FOUND, "E404004", "Certification not found."),
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "E404005", "Account not found."),
    TICKET_NOT_FOUND(HttpStatus.NOT_FOUND, "E404006", "Ticket not found."),
    TRANSACTION_LOG_NOT_FOUND(HttpStatus.NOT_FOUND, "E404007", "Transaction log not found."),
    CONCERT_NOT_FOUND(HttpStatus.NOT_FOUND, "E404008", "존재하지 않는 공연 정보 입니다."),
    PARTICIPANT_NOT_FOUND(HttpStatus.NOT_FOUND, "E404009", "존재하지 않는 승인 정보 입니다."),
    PHOTOCARD_NOT_FOUND(HttpStatus.NOT_FOUND, "E404010", "존재하지 않는 포토카드 입니다."),
    // 409 Conflict
    CONFLICT(HttpStatus.CONFLICT, "E409000", "Conflict"),
    DUPLICATED_LOGIN_ID(HttpStatus.CONFLICT, "E409001", "중복된 아이디 입니다."),
    DUPLICATED_NICKNAME(HttpStatus.CONFLICT, "E409002", "중복된 닉네임 입니다."),
    ALREADY_REGISTERED_ACCOUNT(HttpStatus.CONFLICT, "E409003", "Already registered account."),
    NOT_ENOUGH_TOKEN_BALANCE(HttpStatus.CONFLICT, "E409004", "Not enough token balance."),
    // 500 Internal Server Error
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E500000", "Internal Server Error");

    private final HttpStatus status;
    private final String detailCode;
    private final String detailMessage;
}
