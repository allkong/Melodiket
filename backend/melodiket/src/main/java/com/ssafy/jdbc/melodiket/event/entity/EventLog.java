package com.ssafy.jdbc.melodiket.event.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(indexName = "event-logs-*")
public class EventLog {

    @Id
    private String id;  // This will map to Elasticsearch's internal _id field

    @Field(type = FieldType.Text)
    private String contractAddress;

    @Field(type = FieldType.Long)
    private long blockHeight;

    @Field(type = FieldType.Text)
    private String eventName;

    @Field(type = FieldType.Text)
    private String transactionHash;

    @Field(type = FieldType.Date)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime timestamp;  // Changed to LocalDateTime to match the Elasticsearch 'date' type
}
