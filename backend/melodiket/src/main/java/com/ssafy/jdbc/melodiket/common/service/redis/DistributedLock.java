package com.ssafy.jdbc.melodiket.common.service.redis;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.TimeUnit;

@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface DistributedLock {
    // Name of the lock
    String key();

    // Lock's time unit
    TimeUnit timeUnit() default TimeUnit.SECONDS;

    // Time to wait for the lock
    long waitTime() default 1L;

    // Time to lease the lock
    long leaseTime() default 30L;
}
