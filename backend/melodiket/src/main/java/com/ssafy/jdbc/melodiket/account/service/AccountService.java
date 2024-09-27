package com.ssafy.jdbc.melodiket.account.service;

import com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity;
import com.ssafy.jdbc.melodiket.account.entity.AccountEntity;
import com.ssafy.jdbc.melodiket.account.repository.AccountCertificationRepository;
import com.ssafy.jdbc.melodiket.account.repository.AccountCursorRepository;
import com.ssafy.jdbc.melodiket.account.repository.AccountRepository;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final UserService userService;
    private final AccountRepository accountRepository;
    private final AccountCertificationRepository accountCertificationRepository;
    private final AccountCursorRepository accountCursorRepository;

    // TODO : 은행 API와 연동 필요
    @Transactional(rollbackOn = Exception.class)
    public String requestAccountCertification(AppUserEntity user, String ownerName, String bankName, String targetNumber) {
        // 이미 등록된 계좌인지 확인
        if (accountRepository.existsAccountEntityByNumber(targetNumber)) {
            throw new HttpResponseException(ErrorDetail.ALREADY_REGISTERED_ACCOUNT);
        }

        accountCertificationRepository
                .findByNumberAndAppUserEntity_LoginId(targetNumber, user.getLoginId())
                .ifPresent((certification) -> {
                    // 인증한 적이 있으면 삭제
                    accountCertificationRepository.delete(certification);
                });

        // 인증 정보 생성
        // 만료는 3분 이후
        Date expiresAt = new Date(System.currentTimeMillis() + 180000);
        String secret = getCertificationCode(4);
        AccountCertificationEntity certification = AccountCertificationEntity.builder()
                .ownerName(ownerName)
                .number(targetNumber)
                .bankName(bankName)
                .secret(secret)
                .appUserEntity(user)
                .expiresAt(expiresAt)
                .build();

        accountCertificationRepository.save(certification);

        return secret;
    }

    @Transactional(rollbackOn = Exception.class)
    public AccountEntity verifyAccountCertification(AppUserEntity user, String targetNumber, String secret) {
        AccountCertificationEntity certification = accountCertificationRepository
                .findBySecret(secret)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.ACCOUNT_CERTIFICATION_NOT_FOUND));

        // 인증 정보 확인
        if (!isValidCertification(secret, targetNumber, certification, user)) {
            throw new HttpResponseException(ErrorDetail.NOT_VALID_ACCOUNT_CERTIFICATION);
        }

        // 만료 되었으면 내역 삭제
        if (certification.getExpiresAt().before(new Date())) {
            accountCertificationRepository.delete(certification);
            throw new HttpResponseException(ErrorDetail.CERTIFICATION_EXPIRED);
        }

        // 유효하면 인증 정보 삭제
        accountCertificationRepository.delete(certification);

        // 계좌 정보 생성
        AccountEntity newAccount = AccountEntity.builder()
                .ownerName(certification.getOwnerName())
                .number(certification.getNumber())
                .bankName(certification.getBankName())
                .appUserEntity(certification.getAppUserEntity())
                .build();

        accountRepository.save(newAccount);

        return newAccount;
    }

    // 알파벳 대문자, 숫자로 이루어진 랜덤한 문자열 생성
    private String getCertificationCode(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int random = (int) (Math.random() * 36);
            if (random < 10) {
                sb.append(random);
            } else {
                sb.append((char) (random + 55));
            }
        }
        return sb.toString();
    }

    private boolean isValidCertification(String secret, String targetNumber, AccountCertificationEntity certification, AppUserEntity user) {
        return certification.getSecret().equals(secret) && certification.getNumber().equals(targetNumber) && certification.getAppUserEntity().equals(user);
    }
}
