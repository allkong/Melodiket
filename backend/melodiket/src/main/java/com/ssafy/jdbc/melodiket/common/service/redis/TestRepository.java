package com.ssafy.jdbc.melodiket.common.service.redis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<TestEntity, Long> {
    TestEntity findByName(String name);
}
