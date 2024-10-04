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

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/stages")
@RequiredArgsConstructor
public class StageController {
    private final StageService stageService;

    @PostMapping
    public ResponseEntity<StageInfoResponse> createStage(Principal principal, @RequestBody @Valid StageRequest stageRequest) {
        String loginId = principal.getName();
        StageInfoResponse response = stageService.createStage(stageRequest, loginId);
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

    @GetMapping("/me")
    public ResponseEntity<Map<String,List<StageInfoResponse>>> getMyStages(Principal principal) {
        String loginId = principal.getName();
        List<StageInfoResponse> response = stageService.getMyStages(loginId);
        return new ResponseEntity<>(Map.of("stages",response), HttpStatus.OK);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<StageInfoResponse> getStageDetails(@PathVariable("uuid") UUID stageUuid) {
        StageInfoResponse response = stageService.getStageDetails(stageUuid);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<StageInfoResponse> updateStage(
            Principal principal,
            @PathVariable("uuid") UUID stageUuid,
            @RequestBody @Valid StageRequest updateStageRequest
    ) {
        StageInfoResponse response = stageService.updateStage(principal, stageUuid, updateStageRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteStage(Principal principal, @PathVariable("uuid") UUID stageUuid) {
        stageService.deleteStage(principal, stageUuid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
