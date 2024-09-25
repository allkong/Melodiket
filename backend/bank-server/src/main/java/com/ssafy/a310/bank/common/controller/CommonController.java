package com.ssafy.a310.bank.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {
    @GetMapping("/")
    public String getServerTime() {
        return System.currentTimeMillis() + "";
    }
}
