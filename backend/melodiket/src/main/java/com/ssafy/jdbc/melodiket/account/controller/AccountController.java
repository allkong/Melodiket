package com.ssafy.jdbc.melodiket.account.controller;

import com.ssafy.jdbc.melodiket.account.controller.dto.*;
import com.ssafy.jdbc.melodiket.account.service.AccountService;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.token.service.dto.TokenTransactionLogResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/me")
    public PageResponse<AccountResp> getMyAccounts(CursorPagingReq pagingReq) {
        System.out.println(pagingReq);
        return null;
    }

    // TODO : 은행 API와 연동 필요
    @PostMapping("/request")
    public ResponseEntity<Map<String, String>> requestAccountCertification(Authentication authentication, @Valid @RequestBody AccountCertificationReq req) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        String code = accountService.requestAccountCertification(user,
                req.ownerName(), req.bankName(), req.targetNumber());
        return ResponseEntity.accepted().body(Map.of("code", code));
    }

    @PostMapping("/verify")
    public ResponseEntity<Void> verifyAccountCertification(Authentication authentication, @Valid @RequestBody AccountVerificationReq req) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        accountService.verifyAccountCertification(user, req.targetNumber(), req.verificationCode());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/charge")
    public ResponseEntity<Void> chargeToken(Authentication authentication, @Valid @RequestBody TokenChargeReq req) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
//        accountService.checkChargeTokenAvailable(user, req.accountNumber());
        accountService.chargeToken(user, req.accountNumber(), req.amount());
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Void> withdrawToken(Authentication authentication, @Valid @RequestBody TokenWithdrawReq req) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
//        accountService.checkWithdrawAvailable(user, req.accountNumber(), req.amount());
        accountService.withdrawToken(user, req.accountNumber(), req.amount());
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/transactions/me")
    public ResponseEntity<PageResponse<TokenTransactionLogResp>> getMyTransactions(Authentication authentication, CursorPagingReq pagingReq,
                                                                                   @RequestParam(required = false) AccountService.TransactionLogFetchMode mode,
                                                                                   @RequestParam(required = false) AccountService.LogType logType) {
        mode = mode == null ? AccountService.TransactionLogFetchMode.FROM_OR_TO : mode;
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        return ResponseEntity.ok(accountService.getLogsOf(user, mode, logType, pagingReq));
    }
}
