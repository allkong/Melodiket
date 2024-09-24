package com.ssafy.a310.bank.account.service;

import com.ssafy.a310.bank.account.controller.dto.BankAccountCursorPagingParam;
import com.ssafy.a310.bank.account.controller.dto.BankTransactionCursorPagingParam;
import com.ssafy.a310.bank.account.controller.dto.TransferReq;
import com.ssafy.a310.bank.account.repository.BankAccountEntity;
import com.ssafy.a310.bank.account.repository.CursorPagingBankAccountRepository;
import com.ssafy.a310.bank.account.repository.CursorPagingBankTransactionRepository;
import com.ssafy.a310.bank.account.repository.TransactionEntity;
import com.ssafy.a310.bank.account.service.domain.BankAccount;
import com.ssafy.a310.bank.account.service.domain.BankTransaction;
import com.ssafy.a310.bank.common.controller.query.dto.CursorPageResp;
import com.ssafy.a310.bank.common.exception.ErrorDetail;
import com.ssafy.a310.bank.common.exception.HttpResponseException;
import com.ssafy.a310.bank.user.repository.UserEntity;
import com.ssafy.a310.bank.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DiyBankAccountService implements BankAccountService {
    private final UserRepository userRepository;
    private final CursorPagingBankAccountRepository bankAccountRepository;
    private final CursorPagingBankTransactionRepository transactionRepository;

    @Transactional
    @Override
    public BankAccount createBankAccountOf(String userUuid) throws HttpResponseException {
        UserEntity userEntity = userRepository.findByUuid(userUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        if (bankAccountRepository.countByUserUuid(userUuid) >= MAX_NUM_OF_ACCOUNTS) {
            throw new HttpResponseException(ErrorDetail.MAX_ACCOUNT_COUNT);
        }

        BankAccountEntity entity = BankAccountEntity.builder()
                .user(userEntity)
                .bankName("SSAFY")
                .number(BankAccount.generateRandomNumber())
                .build();

        bankAccountRepository.save(entity);

        return new BankAccount(entity);
    }

    @Override
    public BankAccount createFirstBankAccountOf(String userUuid, int initialAmount) throws HttpResponseException {
        UserEntity userEntity = userRepository.findByUuid(userUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        if (bankAccountRepository.countByUserUuid(userUuid) > 0) {
            throw new HttpResponseException(ErrorDetail.ALREADY_EXIST_ACCOUNT);
        }

        BankAccount entity = createBankAccountOf(userUuid);
        BankAccountEntity bankAccountEntity = bankAccountRepository.findByUuid(entity.getUuid())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.ACCOUNT_NOT_FOUND));

        System.out.println("First account number: " + bankAccountEntity.getNumber());

        TransactionEntity transactionEntity = TransactionEntity.builder()
                .senderName("SYSTEM")
                .sender(null)
                .receiver(bankAccountEntity)
                .amount(initialAmount)
                .build();
        transactionRepository.saveTransaction(transactionEntity);

        return entity;
    }

    @Override
    public CursorPageResp<BankAccount> getBankAccountsOf(String userUuid, BankAccountCursorPagingParam param) throws HttpResponseException {
        if (!userRepository.existsByUuid(userUuid)) {
            throw new HttpResponseException(ErrorDetail.USER_NOT_FOUND);
        }

        CursorPageResp<BankAccountEntity> retrieveResult = bankAccountRepository.getBankAccountsOf(userUuid, param);
        List<BankAccount> result = BankAccount.fromEntities(retrieveResult.data());
        return new CursorPageResp<>(retrieveResult.pageInfo(), result);
    }

    @Override
    public BankAccount getBankAccountByAccountNumber(String accountNumber) throws HttpResponseException {
        BankAccountEntity entity = bankAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.ACCOUNT_NOT_FOUND));
        return new BankAccount(entity);
    }

    @Transactional
    @Override
    public BankTransaction transfer(String senderUuid, String senderAccountNumber, TransferReq reqDto) throws HttpResponseException {
        int amount = reqDto.amount();
        if (amount <= 0) {
            throw new HttpResponseException(ErrorDetail.NOT_POSITIVE_TRANSFER_AMOUNT);
        }

        // 송금자
        UserEntity sender = userRepository.findByUuid(senderUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        BankAccountEntity senderAccount = bankAccountRepository.findByAccountNumber(senderAccountNumber)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.ACCOUNT_NOT_FOUND));
        if (!senderAccount.getUser().getUuid().equals(senderUuid)) {
            throw new HttpResponseException(ErrorDetail.NOT_ACCOUNT_OWNER);
        }

        // 수취자
        BankAccountEntity receiverAccount = bankAccountRepository.findByAccountNumber(reqDto.receiverAccountNumber())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.ACCOUNT_NOT_FOUND));

        int senderBalance = bankAccountRepository.getBalanceOf(senderAccount.getNumber());
        if (senderBalance < amount) {
            throw new HttpResponseException(ErrorDetail.LACK_OF_BALANCE);
        }

        String senderName = reqDto.senderName() == null ? sender.getName() : reqDto.senderName();
        TransactionEntity transactionEntity = TransactionEntity.builder()
                .senderName(senderName)
                .sender(senderAccount)
                .receiver(receiverAccount)
                .amount(amount)
                .build();

        transactionRepository.saveTransaction(transactionEntity);

        return new BankTransaction(transactionEntity);
    }

    @Override
    public CursorPageResp<BankTransaction> getTransactionsOf(String userUuid, String accountNumber, BankTransactionCursorPagingParam param) {
        BankAccountEntity account = bankAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.ACCOUNT_NOT_FOUND));
        if (!account.getUser().getUuid().equals(userUuid)) {
            throw new HttpResponseException(ErrorDetail.NOT_ACCOUNT_OWNER);
        }

        CursorPageResp<TransactionEntity> transactions = transactionRepository.getTransactionsOf(account.getNumber(), param);
        List<BankTransaction> result = BankTransaction.fromEntities(transactions.data());
        return new CursorPageResp<>(transactions.pageInfo(), result);
    }
}
