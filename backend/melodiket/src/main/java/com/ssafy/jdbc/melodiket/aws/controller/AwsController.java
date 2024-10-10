package com.ssafy.jdbc.melodiket.aws.controller;

import com.ssafy.jdbc.melodiket.aws.dto.CreateUploadPathRequest;
import com.ssafy.jdbc.melodiket.aws.dto.PresignedUrl;
import com.ssafy.jdbc.melodiket.aws.service.S3Service;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;

@RestController
@RequestMapping("/api/v1/upload-image")
@RequiredArgsConstructor
public class AwsController {
    private final S3Service s3Service;

    @PostMapping("/presigned-url")
    public ResponseEntity<PresignedUrl> createPresignedUrl(
            @RequestBody @Valid CreateUploadPathRequest request
    ){
//        if(!request.getFileName().contains(" "))
        return new ResponseEntity<>(s3Service.createPresignedUrl(request), HttpStatus.OK);
    }

}
