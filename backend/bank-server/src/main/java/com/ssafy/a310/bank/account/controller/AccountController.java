package com.ssafy.a310.bank.account.controller;

import com.ssafy.a310.bank.account.controller.dto.BankAccountCursorPagingParam;
import com.ssafy.a310.bank.account.controller.dto.BankTransactionCursorPagingParam;
import com.ssafy.a310.bank.account.controller.dto.TransferReq;
import com.ssafy.a310.bank.account.service.BankAccountService;
import com.ssafy.a310.bank.account.service.domain.BankAccount;
import com.ssafy.a310.bank.account.service.domain.BankTransaction;
import com.ssafy.a310.bank.common.controller.query.dto.CursorPageResp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
    private final BankAccountService bankAccountService;

    @PostMapping("")
    public ResponseEntity<BankAccount> createAccount(Principal principal) {
        String uuid = principal.getName();
        BankAccount createdAccount = bankAccountService.createBankAccountOf(uuid);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
    }

    @GetMapping("/me")
    public ResponseEntity<CursorPageResp<BankAccount>> getMyAccounts(Principal principal,
                                                                     @Validated BankAccountCursorPagingParam pagingParam) {
        String userUuid = principal.getName();
        CursorPageResp<BankAccount> accounts = bankAccountService.getBankAccountsOf(userUuid, pagingParam);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{accountNumber}/transactions")
    public ResponseEntity<CursorPageResp<BankTransaction>> getTransactions(Principal principal, @PathVariable String accountNumber, @Validated BankTransactionCursorPagingParam pagingParam) {
        String userUuid = principal.getName();
        CursorPageResp<BankTransaction> transaction = bankAccountService.getTransactionsOf(userUuid, accountNumber, pagingParam);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/{accountNumber}/transfer")
    public ResponseEntity<BankTransaction> transfer(Principal principal, @PathVariable String accountNumber, @Validated @RequestBody TransferReq reqDto) {
        String userUuid = principal.getName();
        BankTransaction transaction = bankAccountService.transfer(userUuid, accountNumber, reqDto);
        return ResponseEntity.ok(transaction);
    }
}
