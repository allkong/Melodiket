package com.ssafy.jdbc.melodiket.common.config;

import com.ssafy.jdbc.melodiket.auth.filter.JwtFilter;
import com.ssafy.jdbc.melodiket.auth.service.JwtService;
import com.ssafy.jdbc.melodiket.user.entity.Role;
import com.ssafy.jdbc.melodiket.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 로그인 하지 않아도 접근 가능한 경로
    private final Pattern[] anonymousAllowedPatterns = {
            // Server time
            Pattern.compile("^/$"),

            // login, logout
            Pattern.compile("^/api/v1/auth/sign-up$"),
            Pattern.compile("^/api/v1/auth/sign-up/[^/]+$"),
            Pattern.compile("^/api/v1/auth/login$"),
            Pattern.compile("^/api/v1/auth/[^/]+/field-duplication-check$"),
            Pattern.compile("^/api/v1/users/stage-managers$"),
            Pattern.compile("^/api/v1/users/stage-managers/[^/]+$"),
//            Pattern.compile("^/api/v1/users/musicians$"),
            Pattern.compile("^/api/v1/users/musicians/[^/]+$"),
            Pattern.compile("^/api/v1/upload-image/presiged-url$"),
//            Pattern.compile("^/api/v1/concerts$"),
            Pattern.compile("^/api/v1/logs$"),
            Pattern.compile("^/api/v1/webpush/publickey$"),
            Pattern.compile("^/api/v1/photo-cards/(?!me$).*"),
            Pattern.compile("^/$"),
    };

    private final JwtService jwtService;
    private final UserService userService;
    private final List<String> allowedOrigins;
    private final RedisTemplate redisTemplate;

    public SecurityConfig(JwtService jwtService, UserService userService, @Value("#{'${security.allowed-origins}'.split(';')}") List<String> allowedOrigins, RedisTemplate redisTemplate) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.allowedOrigins = allowedOrigins;
        this.redisTemplate = redisTemplate;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
        security
                .addFilterBefore(new JwtFilter(redisTemplate, this, jwtService, userService), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(registry -> registry
                        .requestMatchers("/error").permitAll()
                        // 혹시 나중에 swagger 테스트 할수도 있어서 미리
                        .requestMatchers("/swagger-resources/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/concerts/{id}").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/concerts/{id}")
                        .hasAnyRole(Role.AUDIENCE.name(), Role.MUSICIAN.name(), Role.STAGE_MANAGER.name())
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/users/musicians").permitAll()
                        .requestMatchers("/api/v1/concerts").permitAll()
                        .requestMatchers("/api/v1/users/me").authenticated()
                        .requestMatchers(request -> {
                            String path = request.getServletPath();
                            return isAnonymousAllowedPath(path);
                        }).permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증이 필요합니다. 로그인 해주세요.");
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.sendError(HttpServletResponse.SC_FORBIDDEN, "접근 권한이 없습니다.");
                        })
                )
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(allowedOrigins);
                    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                    corsConfiguration.setAllowedHeaders(List.of("*"));
                    return corsConfiguration;
                }));
        return security.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    public boolean isAnonymousAllowedPath(String path) {
        System.out.println(path);
        for (Pattern pattern : anonymousAllowedPatterns) {
            Matcher matcher = pattern.matcher(path);
            if (matcher.matches()) {
                return true;
            }
        }
        return false;
    }

//    @Bean
//    public JwtFilter jwtFilter() {
//        return new JwtFilter(this, jwtService, userService);
//    }
}