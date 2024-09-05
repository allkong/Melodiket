package com.ssafy.a310.bank.auth.filter;

import com.ssafy.a310.bank.auth.service.JwtService;
import com.ssafy.a310.bank.common.config.WebSecurityConfiguration;
import com.ssafy.a310.bank.user.service.UserService;
import com.ssafy.a310.bank.user.service.domain.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@RequiredArgsConstructor
@Slf4j
@Component
public class HttpJwtAuthFilter extends OncePerRequestFilter {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";

    @Autowired
    private WebSecurityConfiguration webSecurityConfiguration;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 사용자의 요청이 authentication을 필요로 하지 않는다면 그냥 넘기기
        if (webSecurityConfiguration.isAnonymousAllowedPath(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Authentication이 필요하면 요청에서 Access JWT를 추출해서
        String uuid = getValidIdentifier(request);
        // 존재 여부 확인
        if (uuid != null) {
            try {
                User user = userService.getUserByUuid(uuid);
                // 식별자를 저장 (role 저장)
                Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user.getUuid(), null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                // 다음 필터로 넘기기
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    // 요청에 포함된 인증 정보의 유효성을 검증하고, 해당 사용자를 식별할 수 있는 값을 반환한다.
    private String getValidIdentifier(HttpServletRequest request) {
        String token = parseToken(request);
        return getIdentifierFrom(token);
    }

    // HTTP 요청으로부터 JWT 토큰을 추출한다.
    private String parseToken(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION_HEADER);
        if (token != null && token.startsWith(TOKEN_PREFIX)) {
            return token.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    // JWT 토큰을 검증하고, 토큰에 포함된 사용자 식별자를 반환한다.
    private String getIdentifierFrom(String token) {
        if (token == null) {
            return null;
        }
        return jwtService.getClaims(token).get("uuid", String.class);
    }

    // 사용자의 요청에 authentication이 필요한지 확인한다.
    private boolean isAuthenticationRequired(HttpServletRequest request) {
        return !webSecurityConfiguration.isAnonymousAllowedPath(request.getRequestURI());
    }
}

