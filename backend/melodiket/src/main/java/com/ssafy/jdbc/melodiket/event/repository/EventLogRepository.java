package com.ssafy.jdbc.melodiket.event.repository;

import com.ssafy.jdbc.melodiket.event.entity.EventLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface EventLogRepository extends ElasticsearchRepository<EventLog, String> {
}
