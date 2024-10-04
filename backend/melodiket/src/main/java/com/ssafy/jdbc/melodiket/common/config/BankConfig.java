package com.ssafy.jdbc.melodiket.common.config;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Getter
@Configuration
public class BankConfig {
    private final RestTemplate restTemplate;
    private final String bankApiUrl;
    private final String accountOwnerName;
    private final String accountOwnerYymmdd;
    private String accessJwt;
    private String accountNumber;

    public BankConfig(RestTemplate restTemplate,
                      @Value("${bank.api-endpoint}") String bankApiUrl,
                      @Value("${bank.owner.name}") String accountOwnerName,
                      @Value("${bank.owner.yymmdd}") String accountOwnerYymmdd) {
        this.restTemplate = restTemplate;
        this.bankApiUrl = bankApiUrl;
        this.accountOwnerName = accountOwnerName;
        this.accountOwnerYymmdd = accountOwnerYymmdd;
    }

    public void updateBankInfo() {
//        Map<String, String> body = Map.of("name", accountOwnerName, "yymmdd", accountOwnerYymmdd);
//
//        URI registerUri = URI.create(bankApiUrl + "/api/v1/users/register");
//        try {
//            restTemplate.postForEntity(registerUri, body, String.class);
//        } catch (Exception e) {
//            // Do nothing
//        }
//
//        URI loginUri = URI.create(bankApiUrl + "/api/v1/users/login");
//        ResponseEntity<Map> loginResponse = restTemplate.postForEntity(loginUri, body, Map.class);
//        String accessToken = (String) loginResponse.getBody().get("accessToken");
//        this.accessJwt = accessToken;
//        restTemplate.getInterceptors().add((request, requestBody, execution) -> {
//            request.getHeaders().add("Authorization", "Bearer " + accessJwt);
//            return execution.execute(request, requestBody);
//        });
//
//        URI accountUri = URI.create(bankApiUrl + "/api/v1/accounts/me?isFirstPage=true&pageSize=100");
//
//        ResponseEntity<Map> accountResponse = restTemplate.getForEntity(accountUri, Map.class);
//        List<String> accounts = (List<String>) accountResponse.getBody().get("data");
//        System.out.println(accounts);
    }
}
