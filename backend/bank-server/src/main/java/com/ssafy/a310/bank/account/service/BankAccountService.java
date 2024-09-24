package com.ssafy.a310.bank.account.service;

import com.ssafy.a310.bank.account.controller.dto.BankAccountCursorPagingParam;
import com.ssafy.a310.bank.account.controller.dto.BankTransactionCursorPagingParam;
import com.ssafy.a310.bank.account.controller.dto.TransferReq;
import com.ssafy.a310.bank.account.service.domain.BankAccount;
import com.ssafy.a310.bank.account.service.domain.BankTransaction;
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
     * 사용자의 첫 은행 계좌를 생성한다.
     *
     * @param userUuid      첫 은행 계좌를 생성할 사용자의 uuid
     * @param initialAmount 초기 입금액
     * @return 생성된 은행 계좌
     * @throws HttpResponseException 해당 uuid를 가지는 사용자가 존재하지 않는 경우 ErrorDetail#USER_NOT_FOUND(E409102)
     * @throws HttpResponseException 이미 은행 계좌가 존재하는 경우 ErrorDetail#ALREADY_EXIST_ACCOUNT(E409103)
     */
    BankAccount createFirstBankAccountOf(String userUuid, int initialAmount) throws HttpResponseException;

    /**
     * 사용자의 은행 계좌 목록을 조회한다.
     *
     * @param userUuid 은행 계좌 목록을 조회할 사용자의 uuid
     * @return 사용자의 은행 계좌 목록
     * @throws HttpResponseException 해당 uuid를 가지는 사용자가 존재하지 않는 경우 ErrorDetail#USER_NOT_FOUND(E409102)
     */
    CursorPageResp<BankAccount> getBankAccountsOf(String userUuid, BankAccountCursorPagingParam param) throws HttpResponseException;

    /**
     * 특정 계좌의 정보를 조회한다.
     *
     * @param accountNumber 조회할 계좌의 계좌번호
     * @return 조회된 계좌 정보
     * @throws HttpResponseException 해당 계좌 번호를 가지는 계좌가 존재하지 않는 경우 ErrorDetail#ACCOUNT_NOT_FOUND(E404101)
     */
    BankAccount getBankAccountByAccountNumber(String accountNumber) throws HttpResponseException;

    /**
     * 사용자의 특정 계좌에서 다른 계좌로 송금한다.
     *
     * @param senderUuid          사용자의 uuid
     * @param senderAccountNumber 송금 계좌 번호
     * @param reqDto              송금 요청 정보
     * @return 송금 거래 정보
     * @throws HttpResponseException 해당 uuid를 가지는 사용자가 존재하지 않는 경우 ErrorDetail#USER_NOT_FOUND(E404101)
     * @throws HttpResponseException 해당 계좌 번호를 가지는 계좌가 존재하지 않는 경우 ErrorDetail#ACCOUNT_NOT_FOUND(E404101)
     * @throws HttpResponseException 송금을 요청한 사용자가 해당 계좌의 소유자가 아닌 경우 ErrorDetail#NOT_ACCOUNT_OWNER(E403100)
     * @throws HttpResponseException 송금액이 0원 이하인 경우 ErrorDetail#INVALID_INPUT_VALUE(E400100)
     * @throws HttpResponseException 송금액이 잔액보다 많은 경우 ErrorDetail#LACK_OF_BALANCE(E409101)
     */
    BankTransaction transfer(String senderUuid, String senderAccountNumber, TransferReq reqDto) throws HttpResponseException;

    /**
     * 특정 계좌의 거래 내역 목록을 조회한다.
     *
     * @param userUuid      거래 내역을 조회할 사용자의 uuid
     * @param accountNumber 거래 내역을 조회할 계좌의 계좌번호
     * @param param         페이징 정보
     * @return 조회된 거래 목록
     * @throws HttpResponseException 해당 uuid를 가지는 사용자가 존재하지 않는 경우 ErrorDetail#USER_NOT_FOUND(E404101)
     * @throws HttpResponseException 해당 계좌 번호를 가지는 계좌가 존재하지 않는 경우 ErrorDetail#ACCOUNT_NOT_FOUND(E404101)
     * @throws HttpResponseException 조회하려는 계좌가 해당 사용자의 계좌가 아닌 경우 ErrorDetail#NOT_ACCOUNT_OWNER(E403100)
     */
    CursorPageResp<BankTransaction> getTransactionsOf(String userUuid, String accountNumber, BankTransactionCursorPagingParam param);
}
