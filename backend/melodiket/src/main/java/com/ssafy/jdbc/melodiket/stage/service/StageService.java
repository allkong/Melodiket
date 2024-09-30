package com.ssafy.jdbc.melodiket.stage.service;

import com.ssafy.jdbc.melodiket.common.controller.dto.CursorPagingReq;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.page.PageResponse;
import com.ssafy.jdbc.melodiket.stage.dto.StageInfoResponse;
import com.ssafy.jdbc.melodiket.stage.dto.StageRequest;
import com.ssafy.jdbc.melodiket.stage.entity.StageAssignmentEntity;
import com.ssafy.jdbc.melodiket.stage.entity.StageEntity;
import com.ssafy.jdbc.melodiket.stage.repository.StageAssignmentRepository;
import com.ssafy.jdbc.melodiket.stage.repository.StageCursorRepository;
import com.ssafy.jdbc.melodiket.stage.repository.StageRepository;
import com.ssafy.jdbc.melodiket.user.entity.StageManagerEntity;
import com.ssafy.jdbc.melodiket.user.repository.StageManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class StageService {
    private final StageRepository stageRepository;
    private final StageAssignmentRepository stageAssignmentRepository;
    private final StageCursorRepository stageCursorRepository;
    private final StageManagerRepository stageManagerRepository;

    /**
     * 주어진 요청 데이터를 기반으로 새로운 스테이지를 생성합니다.
     * 스테이지에 대한 UUID를 생성하고, 이를 데이터베이스에 저장합니다.
     * 생성된 스테이지 정보를 응답 DTO로 반환합니다.
     *
     * @param stageRequest 생성할 스테이지의 세부 정보가 담긴 요청 객체.
     * @return StageInfoResponse 생성된 스테이지의 정보를 담은 응답 DTO.
     */
    public StageInfoResponse createStage(StageRequest stageRequest, String loginId) {
        // StageManagerEntity 조회 (해당 유저가 스테이지 매니저인지 확인)
        StageManagerEntity stageManager = stageManagerRepository.findByUser_LoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        // 새로운 StageEntity 생성
        UUID stageUuid = UUID.randomUUID();
        StageEntity stageEntity = stageRepository.save(
                StageEntity.builder()
                        .uuid(stageUuid)
                        .name(stageRequest.getName())
                        .isStanding(stageRequest.getIsStanding())
                        .address(stageRequest.getAddress())
                        .numOfRow(stageRequest.getNumOfRow())
                        .numOfCol(stageRequest.getNumOfCol())
                        .capacity(stageRequest.getCapacity())
                        .build()
        );

        // StageAssignmentEntity 생성하여 관계 설정
        StageAssignmentEntity assignment = StageAssignmentEntity.builder()
                .stageEntity(stageEntity)
                .stageManagerEntity(stageManager)
                .build();

        stageAssignmentRepository.save(assignment);

        // 생성된 스테이지 정보 반환
        return StageInfoResponse.from(stageEntity);
    }

    /**
     * 커서 기반 페이지네이션을 사용하여 스테이지 목록을 조회합니다.
     * 정렬과 필터링을 적용하고, 커서 기반으로 스테이지를 페이징 처리합니다.
     * 스테이지 목록과 페이징 정보를 응답으로 반환합니다.
     *
     * @return StageCursorPageResponse 스테이지 목록과 페이징 정보를 포함한 응답 객체.
     */
    public PageResponse<StageInfoResponse> getStages(CursorPagingReq pagingReq) {
        return stageCursorRepository.findWithPagination(pagingReq, StageInfoResponse::from);
    }

    /**
     * 주어진 UUID에 해당하는 StageManagerEntity와 연관된 스테이지 목록을 조회합니다.
     *
     * @param loginId 로그인된 유저의 ID
     * @return List<StageInfoResponse> 해당 StageManager가 관리하는 스테이지 목록을 응답 DTO로 반환합니다.
     */
    public List<StageInfoResponse> getMyStages(String loginId) {
        // 유저의 UUID를 통해 StageManagerEntity를 조회
        StageManagerEntity stageManager = stageManagerRepository.findByUser_LoginId(loginId)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER));

        // StageManagerEntity와 연관된 StageEntity 목록 가져오기
        List<StageEntity> stages = stageManager.getStageAssignmentEntities().stream()
                .map(StageAssignmentEntity::getStageEntity)
                .toList();

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
     * 주어진 UUID에 해당하는 스테이지를 업데이트합니다.
     * 요청된 데이터를 기반으로 스테이지의 세부 정보를 수정하고, 수정된 결과를 반환합니다.
     *
     * @param stageUuid          수정할 스테이지의 UUID.
     * @param updateStageRequest 수정할 데이터가 담긴 요청 객체.
     * @return StageInfoResponse 수정된 스테이지 정보를 담은 응답 DTO.
     */
    public StageInfoResponse updateStage(Principal principal, UUID stageUuid, StageRequest updateStageRequest) {
        // 해당 UUID의 스테이지를 조회 (존재하지 않으면 예외 발생)
        StageEntity stageEntity = stageRepository.findByUuid(stageUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        // Stage_Assignment에 해당 유저가 존재하는지 확인
        String loginId = principal.getName();
        StageManagerEntity stageManager = stageManagerRepository.findByUser_LoginId(loginId).orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        if (!stageAssignmentRepository.existsByStageEntityAndStageManagerEntity(stageEntity, stageManager)) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER);
        }

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
        return StageInfoResponse.from(stageEntity);
    }

    /**
     * 주어진 UUID에 해당하는 스테이지를 삭제합니다.
     * 스테이지가 존재하지 않을 경우 예외를 던집니다.
     *
     * @param stageUuid 삭제할 스테이지의 UUID.
     */
    public void deleteStage(Principal principal, UUID stageUuid) {
        // 해당 UUID의 스테이지를 조회 (존재하지 않으면 예외 발생)
        StageEntity stageEntity = stageRepository.findByUuid(stageUuid)
                .orElseThrow(() -> new HttpResponseException(ErrorDetail.STAGE_NOT_FOUND));

        // Stage_Assignment에 해당 유저가 존재하는지 확인
        String loginId = principal.getName();
        StageManagerEntity stageManager = stageManagerRepository.findByUser_LoginId(loginId).orElseThrow(() -> new HttpResponseException(ErrorDetail.USER_NOT_FOUND));

        if (!stageAssignmentRepository.existsByStageEntityAndStageManagerEntity(stageEntity, stageManager)) {
            throw new HttpResponseException(ErrorDetail.FORBIDDEN_STAGE_MANAGER);
        }

        stageRepository.delete(stageEntity);
    }
}
