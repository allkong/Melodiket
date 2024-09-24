package com.ssafy.a310.bank.common.config;

import com.ssafy.a310.bank.manager.interceptor.ManagerAuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final ManagerAuthInterceptor managerAuthInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(managerAuthInterceptor)
                .addPathPatterns("/api/v1/manager/**");
    }
}