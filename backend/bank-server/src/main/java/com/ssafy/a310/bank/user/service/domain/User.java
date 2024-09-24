package com.ssafy.a310.bank.user.service.domain;

import com.ssafy.a310.bank.user.repository.UserEntity;
import lombok.Getter;

@Getter
public class User {
    public static final String SYSTEM_USER_NAME = "SYSTEM";
    public static final String SYSTEM_USER_YYMMDD = "000000";

    private final String uuid;
    private final String name;
    private final String yymmdd;

    public User(UserEntity entity) {
        this.uuid = entity.getUuid();
        this.name = entity.getName();
        this.yymmdd = entity.getYymmdd();
    }
}
