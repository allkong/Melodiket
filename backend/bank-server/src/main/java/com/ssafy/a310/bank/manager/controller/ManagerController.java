package com.ssafy.a310.bank.manager.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/manager")
public class ManagerController {
    @PostMapping("/accounts/{accountNumber}/transfer")
    public String transfer(@PathVariable String accountNumber) {
        return "Transfer to account " + accountNumber;
    }
}
