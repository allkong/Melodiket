package com.ssafy.jdbc.melodiket.stage.service;

import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
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

    /**
     * 주어진 요청 데이터를 기반으로 새로운 스테이지를 생성합니다.
     * 스테이지에 대한 UUID를 생성하고, 이를 데이터베이스에 저장합니다.
     * 생성된 스테이지 정보를 응답 DTO로 반환합니다.
     *
     * @param createStageRequest 생성할 스테이지의 세부 정보가 담긴 요청 객체.
     * @return StageInfoResponse 생성된 스테이지의 정보를 담은 응답 DTO.
     */
    public StageInfoResponse createStage(CreateStageRequest createStageRequest) {
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

    /**
     * 커서 기반 페이지네이션을 사용하여 스테이지 목록을 조회합니다.
     * 정렬과 필터링을 적용하고, 커서 기반으로 스테이지를 페이징 처리합니다.
     * 스테이지 목록과 페이징 정보를 응답으로 반환합니다.
     *
     * @param isFirstPage   첫 페이지 여부.
     * @param lastUuid      이전 페이지의 마지막 스테이지 UUID (커서 기반 페이지네이션에 사용됨).
     * @param pageSize      한 페이지에서 조회할 스테이지 수.
     * @param segment       추가적인 필터링 기준 (현재는 사용되지 않음).
     * @param orderKey      정렬 기준 필드 (예: "createdAt").
     * @param orderDirection 정렬 방향 ("asc" 또는 "desc").
     * @return StageCursorPageResponse 스테이지 목록과 페이징 정보를 포함한 응답 객체.
     */
    public StageCursorPageResponse getStages(Boolean isFirstPage, UUID lastUuid, int pageSize, String segment, String orderKey, String orderDirection) {
        Sort sort = Sort.by(Sort.Order.by(orderKey).with(Sort.Direction.fromString(orderDirection)));

        List<StageEntity> stages = stageCursorRepository.findWithPagination(sort, lastUuid, isFirstPage, pageSize);

        boolean hasNext = stages.size() > pageSize;

        List<StageEntity> resultStages = hasNext ? stages.subList(0, pageSize) : stages;

        UUID nextCursor = hasNext ? resultStages.get(resultStages.size() - 1).getUuid() : null;

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
                .pageInfo(new PageInfoCursor(hasNext, pageSize, stageInfoResponses.size(), nextCursor))
                .result(stageInfoResponses)
                .build();
    }

    /**
     * 주어진 UUID에 해당하는 스테이지를 업데이트합니다.
     * 요청된 데이터를 기반으로 스테이지의 세부 정보를 수정하고, 수정된 결과를 반환합니다.
     *
     * @param stageUuid       수정할 스테이지의 UUID.
     * @param updateStageRequest 수정할 데이터가 담긴 요청 객체.
     * @return StageInfoResponse 수정된 스테이지 정보를 담은 응답 DTO.
     */
    public StageInfoResponse updateStage(UUID stageUuid, CreateStageRequest updateStageRequest) {
        // 해당 UUID의 스테이지를 조회 (존재하지 않으면 예외 발생)
        StageEntity stageEntity = stageRepository.findByUuid(stageUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        // 요청된 데이터로 스테이지 필드 수정
        stageEntity.update(
                updateStageRequest.getName(),
                updateStageRequest.getAddress(),
                updateStageRequest.getIsStanding(),
                updateStageRequest.getNumOfRow(),
                updateStageRequest.getNumOfCol(),
                updateStageRequest.getCapacity()
        );

        // 변경된 스테이지 정보를 반환
        return StageInfoResponse.builder()
                .uuid(stageEntity.getUuid())
                .name(stageEntity.getName())
                .isStanding(stageEntity.getIsStanding())
                .address(stageEntity.getAddress())
                .numOfRow(stageEntity.getNumOfRow())
                .numOfCol(stageEntity.getNumOfCol())
                .capacity(stageEntity.getCapacity())
                .build();
    }

    /**
     * 주어진 UUID에 해당하는 스테이지를 삭제합니다.
     * 스테이지가 존재하지 않을 경우 예외를 던집니다.
     *
     * @param stageUuid 삭제할 스테이지의 UUID.
     */
    public void deleteStage(UUID stageUuid) {
        // 해당 UUID의 스테이지가 존재하는지 확인
        StageEntity stageEntity = stageRepository.findByUuid(stageUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        // 스테이지 삭제
        stageRepository.delete(stageEntity);
    }
}
