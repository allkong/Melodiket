package com.ssafy.a310.bank.auth.service;

import com.ssafy.a310.bank.common.constant.MilliSecOf;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    private final SecretKey secretKey;
    private final String issuer;

    public JwtService(@Value("${jwt.secret}") String rawSecretKey, @Value("${jwt.issuer}") String issuer) {
        secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(rawSecretKey));
        this.issuer = issuer;
    }

    public String generateToken(JwtType type, Map<String, Object> payload, long expirationAfter) {
        Claims claims = Jwts.claims()
                .add(payload)
                .add("type", type) // 타입 덮어쓰기
                .build();

        long now = System.currentTimeMillis();
        return Jwts.builder()
                .issuer(issuer) // 발급자
                .claims(claims) // 내용
                .issuedAt(new Date(now)) // 발급 시간
                .expiration(new Date(now + expirationAfter)) // 만료 시간
                .signWith(secretKey) // 서명
                .compact();
    }

    public String getUuidFromToken(String token) {
        return (String) getClaims(token).get("uuid");
    }

    public Claims getClaims(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }
}
