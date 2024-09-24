package com.ssafy.jdbc.melodiket.stage.controller;

import com.ssafy.jdbc.melodiket.stage.dto.StageRequest;
import com.ssafy.jdbc.melodiket.stage.dto.StageCursorPageResponse;
import com.ssafy.jdbc.melodiket.stage.dto.StageInfoResponse;
import com.ssafy.jdbc.melodiket.stage.service.StageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/stages")
@RequiredArgsConstructor
public class StageController {
    private final StageService stageService;

    @PostMapping
    public ResponseEntity<StageInfoResponse> createStage(@RequestBody @Valid StageRequest createStageRequest) {
        StageInfoResponse response = stageService.createStage(createStageRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<StageCursorPageResponse> getCursorStages(
            @RequestParam(value = "isFirstPage", required = true) Boolean isFirstPage,
            @RequestParam(value = "lastUuid", required = false) UUID lastUuid,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "orderKey", defaultValue = "id") String orderKey,
            @RequestParam(value = "orderDirection", defaultValue = "asc") String orderDirection
    ) {
        StageCursorPageResponse response = stageService.getStages(isFirstPage, lastUuid, pageSize, "", orderKey, orderDirection);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<StageInfoResponse> updateStage(
            @PathVariable("uuid") UUID stageUuid,
            @RequestBody @Valid StageRequest updateStageRequest
    ) {
        StageInfoResponse response = stageService.updateStage(stageUuid, updateStageRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteStage(@PathVariable("uuid") UUID stageUuid) {
        stageService.deleteStage(stageUuid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
