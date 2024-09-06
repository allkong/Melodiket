package com.ssafy.a310.bank.common.controller.query.dto;

import com.ssafy.a310.bank.common.controller.validation.Conditional;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.domain.PageRequest;

import java.util.List;


@Getter
@ToString
@Conditional.List({
        @Conditional(
                selected = "isFirstPage",
                values = {"false"},
                required = {"lastUuid"},
                message = "lastUuid is required when isFirstPage is false"
        )
})
public class CursorPagingParam extends FilteringSegmentParam {
    @NotNull
    final boolean isFirstPage;
    @NotNull
    @Positive
    final int pageSize;
    final String lastUuid;
    final String orderKey;
    final String orderDirection;

    public CursorPagingParam(boolean isFirstPage, Integer pageSize, String lastUuid, String orderKey, String orderDirection, List<String> segment) {
        super(segment);
        this.isFirstPage = isFirstPage;
        this.lastUuid = lastUuid;

        this.pageSize = pageSize;
        this.orderKey = orderKey;
        this.orderDirection = orderDirection == null ? "ASC" : orderDirection;
    }

    public PageRequest toPageRequest() {
        return PageRequest.of(0, pageSize);
    }
}
