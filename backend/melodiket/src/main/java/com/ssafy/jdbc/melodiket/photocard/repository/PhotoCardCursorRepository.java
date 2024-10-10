package com.ssafy.jdbc.melodiket.photocard.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jdbc.melodiket.common.exception.ErrorDetail;
import com.ssafy.jdbc.melodiket.common.page.BaseQueryRepository;
import com.ssafy.jdbc.melodiket.photocard.dto.PhotoCardResp;
import com.ssafy.jdbc.melodiket.photocard.entity.PhotoCardEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PhotoCardCursorRepository extends BaseQueryRepository<PhotoCardEntity, PhotoCardResp> {
    @Autowired
    public PhotoCardCursorRepository(JPAQueryFactory jpaQueryFactory) {
        super(jpaQueryFactory, PhotoCardEntity.class, ErrorDetail.PHOTOCARD_NOT_FOUND);
    }
}
