package com.ssafy.a310.bank.account.service;

import com.ssafy.a310.bank.account.controller.dto.BankAccountCursorPagingParam;
import com.ssafy.a310.bank.account.service.domain.BankAccount;
import com.ssafy.a310.bank.common.controller.query.dto.CursorPageResp;
import com.ssafy.a310.bank.common.exception.HttpResponseException;

public interface BankAccountService {
    int MAX_NUM_OF_ACCOUNTS = 10;
    int DEFAULT_BALANCE = 3000000;

    /**
     * 새 은행 계좌를 생성한다.
     *
     * @param userUuid 은행 계좌를 생성할 사용자의 uuid
     * @return 생성된 은행 계좌
     * @throws HttpResponseException 만들 수 있는 계좌 개수의 한도를 초과한 경우 ErrorDetail#MAX_ACCOUNT_COUNT(E409102)
     * @throws HttpResponseException 해당 uuid를 가지는 사용자가 존재하지 않는 경우 ErrorDetail#USER_NOT_FOUND(E409102)
     */
    BankAccount createBankAccountOf(String userUuid) throws HttpResponseException;

    /**
     * 사용자의 은행 계좌 목록을 조회한다.
     *
     * @param userUuid 은행 계좌 목록을 조회할 사용자의 uuid
     * @return 사용자의 은행 계좌 목록
     * @throws HttpResponseException 해당 uuid를 가지는 사용자가 존재하지 않는 경우 ErrorDetail#USER_NOT_FOUND(E409102)
     */
    CursorPageResp<BankAccount> getBankAccountsOf(String userUuid, BankAccountCursorPagingParam param) throws HttpResponseException;
}
