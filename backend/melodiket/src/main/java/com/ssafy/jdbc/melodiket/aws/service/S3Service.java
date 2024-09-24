package com.ssafy.jdbc.melodiket.aws.service;


import com.amazonaws.services.s3.AmazonS3Client;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.concurrent.CompletableFuture;

@RequiredArgsConstructor
@Service
public class S3Service {

    private final AmazonS3Client amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String BUCKET_NAME;

    @Value("${cloudfront.domain}")
    private String CLOUDFRONT_DOMAIN;

    @Async("imageUploadExecutor")
    public CompletableFuture<String> uploadFile(File file, String key) {
        CompletableFuture<String> future = new CompletableFuture<>();
        amazonS3.putObject(BUCKET_NAME, key, file);

        future.complete(String.format("https://%s/%s",CLOUDFRONT_DOMAIN,key));

        return future;
    }


}

