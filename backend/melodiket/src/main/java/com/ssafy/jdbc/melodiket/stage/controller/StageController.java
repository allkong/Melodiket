package com.ssafy.jdbc.melodiket.stage.controller;

import com.ssafy.jdbc.melodiket.stage.dto.CreateStageRequest;
import com.ssafy.jdbc.melodiket.stage.dto.StageCursorPageResponse;
import com.ssafy.jdbc.melodiket.stage.dto.StageInfoResponse;
import com.ssafy.jdbc.melodiket.stage.service.StageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/stages")
@RequiredArgsConstructor
public class StageController {
    private final StageService stageService;

    @PostMapping
    public StageInfoResponse createStage(@RequestBody @Valid CreateStageRequest createStageRequest){
        return stageService.createStage(createStageRequest);
    }

    @GetMapping
    public StageCursorPageResponse getCursorStages(
        @RequestParam(value = "isFirstPage", required = true) Boolean isFirstPage,
        @RequestParam(value = "lastUuid", required = false) UUID lastUuid,
        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
        @RequestParam(value = "orderKey", defaultValue = "id") String orderKey,
        @RequestParam(value = "orderDirection", defaultValue = "asc") String orderDirection
    ) {
        return stageService.getStages(isFirstPage, lastUuid, pageSize, "", orderKey, orderDirection);
    }

}
