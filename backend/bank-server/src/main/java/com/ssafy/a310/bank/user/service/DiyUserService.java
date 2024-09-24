package com.ssafy.a310.bank.user.service;

import com.ssafy.a310.bank.account.repository.BankAccountEntity;
import com.ssafy.a310.bank.account.repository.TransactionRepository;
import com.ssafy.a310.bank.account.service.BankAccountService;
import com.ssafy.a310.bank.account.service.domain.BankAccount;
import com.ssafy.a310.bank.common.exception.ErrorDetail;
import com.ssafy.a310.bank.common.exception.HttpResponseException;
import com.ssafy.a310.bank.user.repository.UserEntity;
import com.ssafy.a310.bank.user.repository.UserRepository;
import com.ssafy.a310.bank.user.service.domain.User;
import com.ssafy.a310.bank.user.service.domain.UserRole;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class DiyUserService implements UserService {
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final BankAccountService bankAccountService;

    public boolean isExistUser(String name, String yymmdd) {
        return userRepository.existsByNameAndYymmdd(name, yymmdd);
    }

    @Override
    public User getUserByLoginReq(String name, String yymmdd) {
        UserEntity entity = userRepository.findByNameAndYymmdd(name, yymmdd)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        return new User(entity);
    }

    @Override
    public User getUserByUuid(String uuid) {
        UserEntity entity = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));
        return new User(entity);
    }

    @Transactional
    @Override
    public void createUser(String name, String yymmdd) {
        if (isExistUser(name, yymmdd)) {
            throw new HttpResponseException(ErrorDetail.ALREADY_EXIST_USER);
        }

        UserEntity entity = UserEntity.builder()
                .name(name)
                .role(UserRole.USER)
                .yymmdd(yymmdd)
                .build();
        userRepository.save(entity);

        bankAccountService.createFirstBankAccountOf(entity.getUuid(), BankAccountService.DEFAULT_BALANCE);
    }

    @Override
    public boolean isAvailableName(String name) {
        return !User.SYSTEM_USER_NAME.equals(name);
    }

    @Override
    public User createSystemUser() {
        if (isExistUser(User.SYSTEM_USER_NAME, User.SYSTEM_USER_YYMMDD)) {
            return getUserByLoginReq(User.SYSTEM_USER_NAME, User.SYSTEM_USER_YYMMDD);
        }

        UserEntity entity = UserEntity.builder()
                .name(User.SYSTEM_USER_NAME)
                .role(UserRole.SYSTEM)
                .yymmdd(User.SYSTEM_USER_YYMMDD)
                .build();
        userRepository.save(entity);

        BankAccountEntity accountEntity = BankAccountEntity.builder()
                .user(entity)
                .number(BankAccount.generateRandomNumber())
                .bankName("SSAFY")
                .build();

        return new User(entity);
    }

    @Override
    public User getSystemUser() {
        return getUserByLoginReq(User.SYSTEM_USER_NAME, User.SYSTEM_USER_YYMMDD);
    }
}
