package com.ssafy.jdbc.melodiket.auth.filter;

import com.ssafy.jdbc.melodiket.auth.service.JwtService;
import com.ssafy.jdbc.melodiket.common.config.SecurityConfig;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

public class JwtFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";
    private final RedisTemplate redisTemplate;
    private final SecurityConfig securityConfig;
    private final JwtService jwtService;
    private final UserService userService;

    public JwtFilter(RedisTemplate redisTemplate, SecurityConfig securityConfig, JwtService jwtService, UserService userService) {
        this.redisTemplate = redisTemplate;
        this.securityConfig = securityConfig;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println(123);
        // 사용자의 요청이 authentication을 필요로 하지 않는다면 그냥 넘기기
        if (securityConfig.isAnonymousAllowedPath(request.getRequestURI())) {
            Authentication authentication = new AnonymousAuthenticationToken(
                    "anonymousUser",  // 익명 사용자의 식별자
                    "anonymousUser",  // 익명 사용자의 프린시플
                    AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS")  // 익명 사용자의 권한
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
            return;
        }

        // 요청에서 JWT 토큰 추출
        String uuid = getValidIdentifier(request);
        String token = jwtService.resolveToken(request);
        if(redisTemplate.hasKey(token)){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "The token is blacklisted");
        }
        // JWT 토큰이 존재
        if (uuid != null) {
            try {
                AppUserEntity user = userService.findUserByUuid(UUID.fromString(uuid));
                // 식별자를 저장 (role 저장)
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } else {
            Authentication authentication = new AnonymousAuthenticationToken(
                    "anonymousUser",  // 익명 사용자의 식별자
                    "anonymousUser",  // 익명 사용자의 프린시플
                    AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS")  // 익명 사용자의 권한
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        // 다음 필터로 넘기기
        filterChain.doFilter(request, response);
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
}

