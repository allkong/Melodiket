package com.ssafy.jdbc.melodiket.concert.entity;

import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.exception.HttpResponseException;
import com.ssafy.jdbc.melodiket.common.base.BaseEntity;
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
public class ConcertParticipantMusicianEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false)
    private ConcertEntity concertEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "musician_id", nullable = false)
    private MusicianEntity musicianEntity;

    @Column(nullable = false)
    private Boolean approval;

    @Column
    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING; // 기본값 대기상태

    // 상태 변경 메서드 추가
    public void approve() {
        if (this.approvalStatus == ApprovalStatus.APPROVED) {
            // 이미 승인 된 상태라면
            throw new HttpResponseException(ErrorDetail.ALREADY_APPROVED);
        } else if (this.approvalStatus == ApprovalStatus.DENIED) {
            // 이미 거절 된 상태라면
            throw new HttpResponseException(ErrorDetail.ALREADY_DENIED);
        } else
            this.approval = true; // 승인 상태로 변경
    }

    public void deny() {
        if (this.approvalStatus == ApprovalStatus.APPROVED) {
            // 이미 승인 된 상태라면
            throw new HttpResponseException(ErrorDetail.ALREADY_APPROVED);
        } else if (this.approvalStatus == ApprovalStatus.DENIED) {
            // 이미 거절 된 상태라면
            throw new HttpResponseException(ErrorDetail.ALREADY_DENIED);
        } else
            this.approval = false; // 거절 상태로 변경
    }
}
