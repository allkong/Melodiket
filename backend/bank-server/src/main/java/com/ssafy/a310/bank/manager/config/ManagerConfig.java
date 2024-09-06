package com.ssafy.a310.bank.manager.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class ManagerConfig {
    private final String managerApiKey;

    public ManagerConfig(@Value("${manager.api-key}") String managerApiKey) {
        this.managerApiKey = managerApiKey;
    }
}
