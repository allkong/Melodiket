package com.ssafy.jdbc.melodiket.aws.service;


import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.ssafy.jdbc.melodiket.aws.dto.CreateUploadPathRequest;
import com.ssafy.jdbc.melodiket.aws.dto.PresignedUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3Service {
    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.s3.presigned-url-expired}")
    private Long EXPIRE_TIME;

    @Value("${cloud.aws.s3.bucket}")
    private String BUCKET_NAME;

    @Value("${cloudfront.domain}")
    private String CLOUDFRONT_DOMAIN;

    public PresignedUrl createPresignedUrl(CreateUploadPathRequest request) {
        String fileName = request.getFileName();
        String ext = fileName.substring(fileName.lastIndexOf(".")+1);
        String path = String.format("upload/%s/%s/%s",
                    request.getType().name().toLowerCase(),
                    LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd")),
                    UUID.randomUUID().toString().replace("-","")+"."+ext
                );
        return new PresignedUrl(
                generatePresignedUrl(path),
                String.format("%s/%s",CLOUDFRONT_DOMAIN,path)
        );
    }

    public String generatePresignedUrl(String path) {
        if(path.startsWith("/")) {
            path = path.substring(1);
        }
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(BUCKET_NAME, path)
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(makeExpirationTime(EXPIRE_TIME) );
        return amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString();
    }

    private Date makeExpirationTime(long expiredTime){
        Date expiration = new Date();
        long expireTimeMillis = expiration.getTime();
        expireTimeMillis += expiredTime;
        expiration.setTime(expireTimeMillis);
        return expiration;
    }


}

