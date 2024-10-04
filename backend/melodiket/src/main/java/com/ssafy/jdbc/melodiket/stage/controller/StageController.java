package com.ssafy.jdbc.melodiket.stage.controller;

import com.ssafy.jdbc.melodiket.stage.dto.SeatingStageCreateReq;
import com.ssafy.jdbc.melodiket.stage.dto.StageInfoResponse;
import com.ssafy.jdbc.melodiket.stage.dto.StandingStageCreateReq;
import com.ssafy.jdbc.melodiket.stage.service.StageService;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/stages")
@RequiredArgsConstructor
public class StageController {
    private final StageService stageService;

    @PostMapping("/standing")
    public ResponseEntity<StageInfoResponse> createStage(Authentication authentication,
                                                         @RequestBody @Valid StandingStageCreateReq stageCreateReq) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        StageInfoResponse response = stageService.createStandingStage(stageCreateReq, user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/seating")
    public ResponseEntity<StageInfoResponse> createSeatingStage(Authentication authentication,
                                                                @RequestBody @Valid SeatingStageCreateReq stageCreateReq) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        StageInfoResponse response = stageService.createSeatingStage(stageCreateReq, user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Map<String, List<StageInfoResponse>>> getAllStages() {
        List<StageInfoResponse> response = stageService.getAllStages();
        return new ResponseEntity<>(Map.of("stages", response), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, List<StageInfoResponse>>> getMyStages(Authentication authentication) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        List<StageInfoResponse> response = stageService.getMyStages(user);
        return new ResponseEntity<>(Map.of("stages", response), HttpStatus.OK);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<StageInfoResponse> getStageDetails(@PathVariable("uuid") UUID stageUuid) {
        StageInfoResponse response = stageService.getStageDetails(stageUuid);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteStage(Authentication authentication, @PathVariable("uuid") UUID stageUuid) {
        AppUserEntity user = (AppUserEntity) authentication.getPrincipal();
        stageService.deleteStage(user, stageUuid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
