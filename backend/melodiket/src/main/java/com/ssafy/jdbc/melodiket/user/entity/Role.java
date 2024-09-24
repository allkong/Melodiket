package com.ssafy.jdbc.melodiket.user.entity;

public enum Role {

    SYSTEM_ADMIN,
    AUDIENCE,
    MUSICIAN,
    STAGE_MANAGER;

    public String getAuthority() {
        return "ROLE_" + this.name();
    }
}
