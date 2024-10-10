package com.ssafy.jdbc.melodiket.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final String issuer;

    public JwtService(@Value("${jwt.secret}") String rawSecretKey, @Value("${jwt.issuer}") String issuer) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(rawSecretKey));
        this.issuer = issuer;
    }

    // JWT 생성 메서드
    public String generateToken(JwtType type, Map<String, Object> payload, long expirationAfter) {
        Claims claims = Jwts.claims()
                .add(payload)
                .add("type", type)
                .build();
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .issuer(issuer)
                .claims(claims)
                .issuedAt(new Date(now))
                .expiration(new Date(now + expirationAfter))
                .signWith(secretKey)
                .compact();
    }

    // 토큰에서 사용자 UUID 추출
    public String getUuidFromToken(String token) {
        return (String) getClaims(token).get("uuid");
    }

    // Claims 검증 / 가져오기
    public Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // JWT에서 Authentication 객체를 생성
    public Authentication getAuthentication(String token, UserDetails userDetails) {
        return new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // HTTP 요청에서 JWT 추출
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
