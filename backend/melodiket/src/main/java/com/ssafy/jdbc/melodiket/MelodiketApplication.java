package com.ssafy.jdbc.melodiket;

import com.ssafy.jdbc.melodiket.common.config.BankConfig;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@Slf4j
@RequiredArgsConstructor
@SpringBootApplication
public class MelodiketApplication {
    private final BankConfig bankConfig;

    public static void main(String[] args) {
        SpringApplication.run(MelodiketApplication.class, args);
    }

    @PostConstruct
    public void init() {
        bankConfig.updateBankInfo();
    }
}
