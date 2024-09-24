package com.ssafy.jdbc.melodiket.stage.service;

import com.ssafy.jdbc.melodiket.common.page.PageInfoCursor;
import com.ssafy.jdbc.melodiket.stage.dto.CreateStageRequest;
import com.ssafy.jdbc.melodiket.stage.dto.StageCursorPageResponse;
import com.ssafy.jdbc.melodiket.stage.dto.StageInfoResponse;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.stage.repository.StageCursorRepository;
import com.ssafy.jdbc.melodiket.stage.repository.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class StageService {
    private final StageRepository stageRepository;
    private final StageCursorRepository stageCursorRepository;

    public StageInfoResponse createStage(CreateStageRequest createStageRequest){
        UUID uuid = UUID.randomUUID();

        StageEntity s = stageRepository.save(StageEntity.builder()
                        .uuid(uuid)
                        .name(createStageRequest.getName())
                        .isStanding(createStageRequest.getIsStanding())
                        .address(createStageRequest.getAddress())
                        .numOfRow(createStageRequest.getNumOfRow())
                        .numOfCol(createStageRequest.getNumOfCol())
                        .capacity(createStageRequest.getCapacity())
                .build()
        );

        return StageInfoResponse.builder()
                        .uuid(uuid)
                        .name(s.getName())
                        .isStanding(s.getIsStanding())
                        .address(s.getAddress())
                        .numOfRow(s.getNumOfRow())
                        .numOfCol(s.getNumOfCol())
                        .capacity(s.getCapacity())
                .build();
    }

    public StageCursorPageResponse getStages(Boolean isFirstPage, UUID lastUuid, int pageSize, String segment, String orderKey, String orderDirection){
        // 정렬 기준 설정
        Sort sort = Sort.by(Sort.Order.by(orderKey).with(Sort.Direction.fromString(orderDirection)));

        // 페이징 데이터 가져오기 (pageSize + 1개)
        List<StageEntity> stages = stageCursorRepository.findWithPagination(sort, lastUuid, isFirstPage, pageSize + 1);

        // hasNext 계산: 페이지 크기보다 많은 데이터가 있으면 다음 페이지가 존재
        boolean hasNext = stages.size() > pageSize;

        // 실제 반환할 데이터: 페이지 크기에 맞춰서 잘라내기
        List<StageEntity> resultStages = hasNext ? stages.subList(0, pageSize) : stages;

        // 다음 커서: 다음 페이지를 가져오기 위한 커서 설정 (마지막 데이터의 UUID)
        UUID nextCursor = hasNext ? resultStages.get(resultStages.size() - 1).getUuid() : null;

        // 반환할 DTO 구성
        List<StageInfoResponse> stageInfoResponses = resultStages.stream()
                .map(stage -> StageInfoResponse.builder()
                        .uuid(stage.getUuid())
                        .name(stage.getName())
                        .address(stage.getAddress())
                        .isStanding(stage.getIsStanding())
                        .numOfRow(stage.getNumOfRow())
                        .numOfCol(stage.getNumOfCol())
                        .capacity(stage.getCapacity())
                        .build())
                .toList();

        return StageCursorPageResponse.builder()
                .pageInfo(new PageInfoCursor(hasNext,pageSize,stageInfoResponses.size(),nextCursor))
                .result(stageInfoResponses)
                .build();
    }

}
