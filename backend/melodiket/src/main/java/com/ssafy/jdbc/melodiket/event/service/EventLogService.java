package com.ssafy.jdbc.melodiket.event.service;

import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import com.ssafy.jdbc.melodiket.event.controller.dto.EventPageInfoCursor;
import com.ssafy.jdbc.melodiket.event.controller.dto.EventPageRequest;
import com.ssafy.jdbc.melodiket.event.controller.dto.EventPageResponse;
import com.ssafy.jdbc.melodiket.event.entity.EventLog;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventLogService {
    private final ElasticsearchOperations elasticsearchOperations;

    public EventPageResponse<EventLog> getLogs(EventPageRequest request) {
        Object[] sortValues = null;

        // Check if it's not the first page and decode the cursor (lastUuid) if available
        if (!request.isFirstPage() && request.getLastId() != null) {
            sortValues = new Object[]{request.getLastId()};
        }

        // Build the filter queries
        List<Query> filterQueries = new ArrayList<>();

        if (request.getEventName() != null) {
            MatchQuery eventNameQuery = MatchQuery.of(m -> m
                    .field("eventName")
                    .query(request.getEventName())
            );
            filterQueries.add(eventNameQuery._toQuery());
        }

        // Combine the filters using a bool query
        BoolQuery boolQuery = BoolQuery.of(b -> b.filter(filterQueries));
        Query finalQuery = boolQuery._toQuery();

        // Sort options based on request
        SortOrder sortOrder = request.getOrderDirection().equalsIgnoreCase("ASC") ? SortOrder.Asc : SortOrder.Desc;
        SortOptions sortOption = SortOptions.of(o -> o.field(f -> f.field(request.getOrderKey()).order(sortOrder)));

        // Create the NativeQuery
        NativeQueryBuilder searchQueryBuilder = NativeQuery.builder()
                .withQuery(finalQuery)
                .withSort(sortOption)  // Apply the sorting
                .withPageable(PageRequest.of(0, request.getPageSize()));  // Set the page size

        // Add search_after if sortValues is not null
        if (sortValues != null) {
            searchQueryBuilder.withSearchAfter(List.of(sortValues));
        }

        NativeQuery searchQuery = searchQueryBuilder.build();

        // Execute the search
        SearchHits<EventLog> searchHits = elasticsearchOperations.search(searchQuery, EventLog.class);
        List<EventLog> products = searchHits.stream().map(SearchHit::getContent).toList();

        boolean hasNextPage = products.size() == request.getPageSize();

        // Get the last UUID (or ID in this case) from the search result
        String lastId = null;
        if (!products.isEmpty()) {
            lastId = products.get(products.size() - 1).getId(); // Assuming `getId()` returns a String
        }

        // Create PageInfoCursor
        EventPageInfoCursor pageInfo = new EventPageInfoCursor(
                hasNextPage,
                request.getPageSize(),
                products.size(),
                lastId
        );

        // Return PageResponse
        return new EventPageResponse<>(pageInfo, products);
    }

}
