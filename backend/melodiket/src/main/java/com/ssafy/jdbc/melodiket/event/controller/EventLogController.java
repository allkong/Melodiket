package com.ssafy.jdbc.melodiket.event.controller;

import com.ssafy.jdbc.melodiket.event.controller.dto.EventPageRequest;
import com.ssafy.jdbc.melodiket.event.controller.dto.EventPageResponse;
import com.ssafy.jdbc.melodiket.event.entity.EventLog;
import com.ssafy.jdbc.melodiket.event.service.EventLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventLogController {

    private final EventLogService eventLogService;

    @GetMapping("/api/v1/logs")
    public ResponseEntity<EventPageResponse<EventLog>> getProducts(EventPageRequest eventPageRequest) {
        return new ResponseEntity<>(eventLogService.getLogs(eventPageRequest), HttpStatus.OK);
    }
}

