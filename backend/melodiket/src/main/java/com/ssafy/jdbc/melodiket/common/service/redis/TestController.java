package com.ssafy.jdbc.melodiket.common.service.redis;

import com.ssafy.jdbc.melodiket.concert.service.ConcertService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.function.Supplier;

@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/test")
public class TestController {
    private final TestRepository testRepository;
    private final ConcertService concertService;

    @RequestMapping("")
    public void foo(@RequestParam String name) throws InterruptedException {
        if (name.equals("aaa")) {
            System.out.println(testRepository.findAll());
            return;
        }

        try {
            Supplier<TestEntity> function = () -> {
                TestEntity entity = TestEntity.builder()
                        .name(name)
                        .build();
                testRepository.save(entity);
                return entity;
            };
            concertService.createConcert(name, function);
            //        concertService.createConcert("managerAddress1");

        } catch (Exception e) {
            e.printStackTrace();
        }
//        System.out.println("Outside : " + testRepository.findAll() + " / " + LocalDateTime.now());
//
//        try {
//            Thread.sleep(6000);
//            System.out.println("Outside 2 : " + testRepository.findAll() + " / " + LocalDateTime.now());
//        } catch (InterruptedException e) {
//        }
//
//        Thread.sleep(8000);
//        System.out.println("Outside 3 : " + testRepository.findAll() + " / " + LocalDateTime.now());
    }
}
