package com.ssafy.a310.bank.account.service;

import com.ssafy.a310.bank.account.controller.dto.BankAccountCursorPagingParam;
import com.ssafy.a310.bank.account.repository.BankAccountEntity;
import com.ssafy.a310.bank.account.repository.CursorPagingBankAccountRepository;
import com.ssafy.a310.bank.account.service.domain.BankAccount;
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
    public CursorPageResp<BankAccount> getBankAccountsOf(String userUuid, BankAccountCursorPagingParam param) throws HttpResponseException {
        if (!userRepository.existsByUuid(userUuid)) {
            throw new HttpResponseException(ErrorDetail.USER_NOT_FOUND);
        }

        CursorPageResp<BankAccountEntity> retrieveResult = bankAccountRepository.getBankAccountsOf(userUuid, param);
        List<BankAccount> result = BankAccount.fromEntities(retrieveResult.data());
        return new CursorPageResp<>(retrieveResult.pageInfo(), result);
    }
}
