package com.ssafy.a310.bank.account.controller;

import com.ssafy.a310.bank.account.controller.dto.BankAccountCursorPagingParam;
import com.ssafy.a310.bank.account.service.BankAccountService;
import com.ssafy.a310.bank.account.service.domain.BankAccount;
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
        String uuid = principal.getName();
        CursorPageResp<BankAccount> accounts = bankAccountService.getBankAccountsOf(uuid, pagingParam);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{accountNumber}/transactions")
    public String getTransactions(@PathVariable String accountNumber) {
        return "Transactions of account " + accountNumber;
    }

    @PostMapping("/{accountNumber}/transfer")
    public String transfer(@PathVariable String accountNumber) {
        return "Transfer to account " + accountNumber;
    }
}
