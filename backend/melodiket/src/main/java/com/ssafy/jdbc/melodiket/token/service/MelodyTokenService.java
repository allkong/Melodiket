package com.ssafy.jdbc.melodiket.token.service;

import com.ssafy.jdbc.melodiket.account.service.AccountService;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.token.entity.TokenTransactionLogEntity;
import com.ssafy.jdbc.melodiket.token.repository.TokenTransactionCursorRepository;
import com.ssafy.jdbc.melodiket.token.repository.TokenTransactionRepository;
import com.ssafy.jdbc.melodiket.token.service.dto.TokenTransactionLogResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class MelodyTokenService {
    private final TokenTransactionRepository tokenTransactionRepository;
    private final TokenTransactionCursorRepository tokenTransactionCursorRepository;

    private TokenTransactionLogResp createTransaction(String from, String to, long amount, AccountService.LogType logType) {
        TokenTransactionLogEntity entity = TokenTransactionLogEntity.builder()
                .uuid(UUID.randomUUID())
                .fromIdentifier(from)
                .toIdentifier(to)
                .logType(logType)
                .amount(amount)
                .build();

        TokenTransactionLogEntity savedEntity = tokenTransactionRepository.save(entity);
        return TokenTransactionLogResp.builder()
                .uuid(savedEntity.getUuid().toString())
                .from(savedEntity.getFromIdentifier())
                .to(savedEntity.getToIdentifier())
                .type(savedEntity.getLogType().toString())
                .amount(savedEntity.getAmount())
                .build();
    }

    public TokenTransactionLogResp createChargeLog(AppUserEntity user, long amount) {
        return createTransaction(TokenTransactionLogEntity.SYSTEM_NAME, user.getUuid().toString(), amount, AccountService.LogType.CHARGE);
    }

    public TokenTransactionLogResp createWithdrawLog(AppUserEntity user, long amount) {
        return createTransaction(user.getUuid().toString(), TokenTransactionLogEntity.SYSTEM_NAME, amount, AccountService.LogType.WITHDRAW);
    }

    public PageResponse<TokenTransactionLogResp> getAsFrom(AppUserEntity user, AccountService.LogType logType, CursorPagingReq pagingReq) {
        return tokenTransactionCursorRepository.getAsFrom(user.getUuid().toString(), logType, pagingReq);
    }

    public PageResponse<TokenTransactionLogResp> getAsTo(AppUserEntity user, AccountService.LogType logType, CursorPagingReq pagingReq) {
        return tokenTransactionCursorRepository.getAsTo(user.getUuid().toString(), logType, pagingReq);
    }

    public PageResponse<TokenTransactionLogResp> getAsFromOrTo(AppUserEntity user, AccountService.LogType logType, CursorPagingReq pagingReq) {
        return tokenTransactionCursorRepository.getAsFromOrTo(user.getUuid().toString(), logType, pagingReq);
    }
}
