package com.ssafy.a310.bank.account.controller.dto;

import com.ssafy.a310.bank.common.controller.query.dto.CursorPagingParam;

import java.util.List;

public class BankTransactionCursorPagingParam extends CursorPagingParam {
    private static final String[] validOrderKeys = {"createdAt"};

    public BankTransactionCursorPagingParam(boolean isFirstPage, Integer pageSize, String lastUuid, String orderKey, String orderDirection, List<String> segment) {
        super(isFirstPage, pageSize, lastUuid, orderKey, orderDirection, segment);

        if (!isValidOrderKey()) {
            throw new IllegalArgumentException("Invalid order key: " + orderKey);
        }
    }

    boolean isValidOrderKey() {
        if (this.getOrderKey() == null) {
            return true;
        }

        for (String validOrderKey : validOrderKeys) {
            if (validOrderKey.equals(this.getOrderKey())) {
                return true;
            }
        }
        return false;
    }
}
