package com.ssafy.a310.bank.manager.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.a310.bank.common.exception.ErrorDetail;
import com.ssafy.a310.bank.common.exception.HttpResponseException;
import com.ssafy.a310.bank.manager.config.ManagerConfig;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class ManagerAuthInterceptor implements HandlerInterceptor {
    private final ObjectMapper objectMapper;
    private final ManagerConfig managerConfig;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        StringBuilder requestBody = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
        }

        Map<String, Object> body = objectMapper.readValue(requestBody.toString(), Map.class);
        Object _apiKey = body.get("apiKey");
        if (_apiKey == null) {
            throw new HttpResponseException(ErrorDetail.MANAGER_AUTH_FAIL);
        }

        String apiKey = (String) _apiKey;
        if (!apiKey.equals(managerConfig.getManagerApiKey())) {
            throw new HttpResponseException(ErrorDetail.MANAGER_AUTH_FAIL);
        }

        return true;
    }
}