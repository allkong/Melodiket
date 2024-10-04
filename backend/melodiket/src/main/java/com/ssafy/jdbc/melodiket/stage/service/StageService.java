package com.ssafy.jdbc.melodiket.stage.service;

import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.stage.dto.SeatingStageCreateReq;
import com.ssafy.jdbc.melodiket.stage.dto.StageInfoResponse;
import com.ssafy.jdbc.melodiket.stage.dto.StandingStageCreateReq;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.stage.repository.StageCursorRepository;
import com.ssafy.jdbc.melodiket.stage.repository.StageRepository;
import com.ssafy.jdbc.melodiket.user.entity.AppUserEntity;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StageService {
    private final StageRepository stageRepository;
    private final StageCursorRepository stageCursorRepository;
    private final StageManagerRepository stageManagerRepository;

    public StageInfoResponse createStandingStage(StandingStageCreateReq stageCreateReq, AppUserEntity user) {
        // StageManagerEntity 조회 (해당 유저가 스테이지 매니저인지 확인)
        StageManagerEntity stageManager = stageManagerRepository.findByLoginId(user.getLoginId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        // 새로운 StageEntity 생성
        UUID stageUuid = UUID.randomUUID();
        StageEntity stageEntity = stageRepository.save(
                StageEntity.builder()
                        .uuid(stageUuid)
                        .owner(stageManager)
                        .name(stageCreateReq.name)
                        .isStanding(true)
                        .address(stageCreateReq.address)
                        .numOfRow(null)
                        .numOfCol(null)
                        .capacity(stageCreateReq.capacity)
                        .build()
        );

        stageRepository.save(stageEntity);

        // 생성된 스테이지 정보 반환
        return StageInfoResponse.from(stageEntity);
    }

    public StageInfoResponse createSeatingStage(SeatingStageCreateReq stageCreateReq, AppUserEntity user) {
        // StageManagerEntity 조회 (해당 유저가 스테이지 매니저인지 확인)
        StageManagerEntity stageManager = stageManagerRepository.findByLoginId(user.getLoginId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        // 새로운 StageEntity 생성
        UUID stageUuid = UUID.randomUUID();
        StageEntity stageEntity = stageRepository.save(
                StageEntity.builder()
                        .uuid(stageUuid)
                        .owner(stageManager)
                        .name(stageCreateReq.name)
                        .isStanding(false)
                        .address(stageCreateReq.address)
                        .numOfRow(stageCreateReq.numOfRow)
                        .numOfCol(stageCreateReq.numOfCol)
                        .capacity(stageCreateReq.numOfRow * stageCreateReq.numOfCol)
                        .build()
        );

        stageRepository.save(stageEntity);

        // 생성된 스테이지 정보 반환
        return StageInfoResponse.from(stageEntity);
    }

    public List<StageInfoResponse> getAllStages() {
        // 모든 스테이지 목록 조회
        List<StageEntity> stages = stageRepository.findAll();

        // 조회된 스테이지 목록을 DTO로 변환하여 반환
        return stages.stream()
                .map(StageInfoResponse::from)
                .toList();
    }

    public List<StageInfoResponse> getMyStages(AppUserEntity user) {
        // 유저의 UUID를 통해 StageManagerEntity를 조회
        StageManagerEntity stageManager = stageManagerRepository.findByLoginId(user.getLoginId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        // StageManagerEntity와 연관된 StageEntity 목록 가져오기
        List<StageEntity> stages = stageManager.getStageEntities();

        // StageEntity를 StageInfoResponse DTO로 변환하여 반환
        return stages.stream()
                .map(StageInfoResponse::from)
                .toList();
    }

    /**
     * 특정 Stage UUID에 대한 스테이지 상세 정보를 조회합니다.
     *
     * @param stageUuid 조회할 스테이지의 UUID.
     * @return StageInfoResponse 조회된 스테이지의 상세 정보가 담긴 응답 DTO.
     */
    public StageInfoResponse getStageDetails(UUID stageUuid) {
        // UUID로 스테이지를 조회하고, 없을 경우 예외 발생
        StageEntity stageEntity = stageRepository.findByUuid(stageUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        // 조회된 스테이지 정보를 DTO로 반환
        return StageInfoResponse.from(stageEntity);
    }

    /**
     * 주어진 UUID에 해당하는 스테이지를 삭제합니다.
     * 스테이지가 존재하지 않을 경우 예외를 던집니다.
     *
     * @param stageUuid 삭제할 스테이지의 UUID.
     */
    public void deleteStage(AppUserEntity user, UUID stageUuid) {
        StageManagerEntity stageManager = stageManagerRepository.findByLoginId(user.getLoginId())
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        // 해당 UUID의 스테이지를 조회 (존재하지 않으면 예외 발생)
        StageEntity stageEntity = stageRepository.findByUuid(stageUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        if (stageEntity.getOwner() != stageManager) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER);
        }

        stageRepository.delete(stageEntity);
    }
}
