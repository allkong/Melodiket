package com.ssafy.jdbc.melodiket.account.controller.dto;

import com.ssafy.jdbc.melodiket.account.entity.AccountEntity;

public record AccountResp(
        String ownerName,
        String number,
        String bankName
) {
    public static AccountResp from(AccountEntity accountEntity) {
        return new AccountResp(
                accountEntity.getOwnerName(),
                accountEntity.getNumber(),
                accountEntity.getBankName()
        );
    }
}
