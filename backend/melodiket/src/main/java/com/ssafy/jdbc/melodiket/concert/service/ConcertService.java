package com.ssafy.jdbc.melodiket.concert.service;

import com.ssafy.jdbc.melodiket.common.service.redis.DistributedLock;
import com.ssafy.jdbc.melodiket.common.service.redis.TestEntity;
import com.ssafy.jdbc.melodiket.common.service.redis.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@RequiredArgsConstructor
@Service
public class ConcertService {
    private final TestRepository testRepository;

    @Async
    @DistributedLock(key = "#managerAddress.concat('-').concat('createConcert')")
    public void createConcert(String managerAddress, Supplier<TestEntity> saveFunction) throws Exception {
        try {
            // Do something
            Thread.sleep(15000);
        } catch (InterruptedException e) {
            e.printStackTrace();
            throw e;
        }

        System.out.println(saveFunction.get());
    }
}
