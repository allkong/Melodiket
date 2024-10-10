package com.ssafy.jdbc.melodiket.event.controller;

import com.ssafy.jdbc.melodiket.event.controller.dto.EventPageRequest;
import com.ssafy.jdbc.melodiket.event.controller.dto.EventPageResponse;
import com.ssafy.jdbc.melodiket.event.entity.EventLog;
import com.ssafy.jdbc.melodiket.event.service.EventLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventLogController {

    private final EventLogService eventLogService;

    @GetMapping("/api/v1/logs/old")
    public ResponseEntity<EventPageResponse<EventLog>> getCursorProducts(EventPageRequest eventPageRequest) {
        return new ResponseEntity<>(eventLogService.getLogs(eventPageRequest), HttpStatus.OK);
    }

    @GetMapping("/api/v1/logs")
    public ResponseEntity<List<EventLog>> getProducts(@RequestParam int pageSize) {
        return new ResponseEntity<>(eventLogService.getLatestLogs(pageSize), HttpStatus.OK);
    }
}

