package com.ssafy.jdbc.melodiket.user.util;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.MessageDigest;
import java.util.Base64;

public class PasswordUtil {

    // salt 생성
    public static String generateSalt() {
        SecureRandom sr;
        byte[] salt = new byte[16];
        try {
            sr = SecureRandom.getInstanceStrong();
            sr.nextBytes(salt);
        } catch (NoSuchAlgorithmException e) {

            // TODO : EXCEPTION 정의 후 변경
            throw new RuntimeException("보안 알고리즘을 찾을 수 없습니다.", e);
        }
        return Base64.getEncoder().encodeToString(salt);
    }

    // salt 와 password 해싱
    public static String hashPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt.getBytes());  // 솔트 추가
            byte[] hashedPassword = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashedPassword);
        } catch (NoSuchAlgorithmException e) {

            // TODO : EXCEPTION 정의 후 변경
            throw new RuntimeException("해싱 알고리즘을 찾을 수 없습니다.", e);
        }
    }

    // 검증
    public static boolean verifyPassword(String inputPassword, String storedPassword, String salt) {
        String hashedInputPassword = hashPassword(inputPassword, salt);
        return hashedInputPassword.equals(storedPassword);
    }
}
