package com.ssafy.jdbc.melodiket.account.service;

import com.ssafy.jdbc.melodiket.account.entity.AccountCertificationEntity;
import com.ssafy.jdbc.melodiket.account.entity.AccountEntity;
import com.ssafy.jdbc.melodiket.account.repository.AccountCertificationRepository;
import com.ssafy.jdbc.melodiket.account.repository.AccountCursorRepository;
import com.ssafy.jdbc.melodiket.account.repository.AccountRepository;
import com.ssafy.jdbc.melodiket.blockchain.config.BlockchainConfig;
import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.common.service.redis.DistributedLock;
import com.ssafy.jdbc.melodiket.token.service.MelodyTokenService;
import com.ssafy.jdbc.melodiket.token.service.contract.MelodyTokenContract;
import com.ssafy.jdbc.melodiket.token.service.dto.TokenTransactionLogResp;
import com.ssafy.jdbc.melodiket.user.controller.dto.WalletResp;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.service.UserService;
import com.ssafy.jdbc.melodiket.wallet.service.WalletService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;

import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Service
public class AccountService {
    private final UserService userService;
    private final AccountRepository accountRepository;
    private final AccountCertificationRepository accountCertificationRepository;
    private final AccountCursorRepository accountCursorRepository;
    private final BlockchainConfig blockchainConfig;
    private final WalletService walletService;
    private final Credentials systemCredential;
    private final MelodyTokenService melodyTokenService;

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

    @Async
    @DistributedLock(key = "#user.uuid.concat('-').concat('chargeToken')")
    public void chargeToken(AppUserEntity user, String accountNumber, int amount) {
        MelodyTokenContract contract = new MelodyTokenContract(blockchainConfig, systemCredential);
        WalletResp wallet = walletService.getWalletOf(user);

        // TODO : 계좌 차감
        contract.sendToken(wallet.address(), amount);
        melodyTokenService.createChargeLog(user, amount);
    }

    public void checkChargeTokenAvailable(AppUserEntity user, String accountNumber) {
        accountRepository.findByAppUserEntityAndNumber(user, accountNumber).orElseThrow(() -> new HttpResponseException(ErrorDetail.ACCOUNT_NOT_FOUND));
    }

    @Async
    @DistributedLock(key = "#user.uuid.concat('-').concat('withdrawToken')")
    public void withdrawToken(AppUserEntity user, String accountNumber, int amount) {
        WalletResp wallet = walletService.getWalletOf(user);

        String privateKey = walletService.getPrivateKeyOf(wallet.address());
        Credentials userCredential = Credentials.create(privateKey);
        MelodyTokenContract userContract = new MelodyTokenContract(blockchainConfig, userCredential);
        userContract.sendToken(systemCredential.getAddress(), amount);
        melodyTokenService.createWithdrawLog(user, amount);

        // TODO : 계좌로 환급
    }

    public void checkWithdrawAvailable(AppUserEntity user, String accountNumber, int amount) {
        accountRepository.findByAppUserEntityAndNumber(user, accountNumber).orElseThrow(() -> new HttpResponseException(ErrorDetail.ACCOUNT_NOT_FOUND));

        WalletResp wallet = walletService.getWalletOf(user);
        if (wallet.tokenBalance() < amount) {
            throw new HttpResponseException(ErrorDetail.NOT_ENOUGH_TOKEN_BALANCE);
        }
    }

    public PageResponse<TokenTransactionLogResp> getLogsOf(AppUserEntity user, TransactionLogFetchMode mode,
                                                           LogType logType, CursorPagingReq pagingReq) {
        switch (mode) {
            case FROM:
                return melodyTokenService.getAsFrom(user, logType, pagingReq);
            case TO:
                return melodyTokenService.getAsTo(user, logType, pagingReq);
            case FROM_OR_TO:
                return melodyTokenService.getAsFromOrTo(user, logType, pagingReq);
            default:
                throw new IllegalArgumentException("Invalid LogFetchMode");
        }
    }

    public enum TransactionLogFetchMode {
        FROM, TO, FROM_OR_TO
    }

    public enum LogType {
        CHARGE, // 계좌 -> 토큰 충전 (SYSTEM -> 사용자)
        WITHDRAW, // 토큰 -> 계좌 출금 (사용자 -> SYSTEM)
        TICKET_PURCHASE, // 티켓 구매 (사용자 -> SYSTEM)
        CONCERT_CANCELED, // 콘서트 취소로 인한 티켓 요금 환불 (StageManager -> Audience)
        TICKET_REFUND, // 티켓 환불 (SYSTEM -> 사용자)
        CONCERT_SETTLEMENT // 콘서트 정산 (SYSTEM -> StageManager)
    }
}
