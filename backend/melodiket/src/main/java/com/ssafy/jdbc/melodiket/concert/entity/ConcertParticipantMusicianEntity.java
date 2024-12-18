package com.ssafy.jdbc.melodiket.concert.entity;

import com.ssafy.jdbc.melodiket.common.base.ExposableEntity;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.user.entity.MusicianEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "concert_participant_musician")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ConcertParticipantMusicianEntity extends ExposableEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false)
    private ConcertEntity concertEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "musician_id", nullable = false)
    private MusicianEntity musicianEntity;

    @Column
    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING; // 기본값 대기상태

    @Column
    private String signatureImageUrl;

    // 상태 변경 메서드 추가
    public void approve(String url) {
        if (this.approvalStatus == ApprovalStatus.APPROVED) {
            // 이미 승인 된 상태라면
            throw new HttpResponseException(ErrorDetail.ALREADY_APPROVED);
        } else if (this.approvalStatus == ApprovalStatus.DENIED) {
            // 이미 거절 된 상태라면
            throw new HttpResponseException(ErrorDetail.ALREADY_DENIED);
        } else {
            this.approvalStatus = ApprovalStatus.APPROVED; // 승인 상태로 변경
            this.signatureImageUrl = url;
        }
    }

    public void deny() {
        if (this.approvalStatus == ApprovalStatus.APPROVED) {
            // 이미 승인 된 상태라면
            throw new HttpResponseException(ErrorDetail.ALREADY_APPROVED);
        } else if (this.approvalStatus == ApprovalStatus.DENIED) {
            // 이미 거절 된 상태라면
            throw new HttpResponseException(ErrorDetail.ALREADY_DENIED);
        } else {
            this.approvalStatus = ApprovalStatus.DENIED; // 거절 상태로 변경
        }
    }

    public ApprovalStatus getIsApproved() {
        return this.approvalStatus;
    }
}
