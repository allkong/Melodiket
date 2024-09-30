package com.ssafy.jdbc.melodiket.common.config;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedissonConfig {
    private final String redisUrl;

    public RedissonConfig(@Value("${redis.url}") String redisUrl) {
        this.redisUrl = redisUrl;
    }

    @Bean
    public Config config() {
        Config config = new Config();
        config.useSingleServer().setAddress(redisUrl);
        return config;
    }

    @Bean
    public RedissonClient redissonClient() {
        return Redisson.create(config());
    }
}
