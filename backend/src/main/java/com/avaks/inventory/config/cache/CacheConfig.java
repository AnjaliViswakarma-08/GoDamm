package com.avaks.inventory.config.cache;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    @ConditionalOnProperty(name = "app.cache.provider", havingValue = "redis")
    public CacheManager redisCacheManager(RedisConnectionFactory redisConnectionFactory) {
        RedisCacheConfiguration defaultCacheConfig = RedisCacheConfiguration.defaultCacheConfig()
                .disableCachingNullValues()
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()))
                .entryTtl(Duration.ofSeconds(60));

        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
        cacheConfigurations.put(CacheNames.PRODUCTS_BY_USER, defaultCacheConfig.entryTtl(Duration.ofSeconds(45)));
        cacheConfigurations.put(CacheNames.PRODUCTS_SALE_INFO_BY_USER, defaultCacheConfig.entryTtl(Duration.ofSeconds(30)));
        cacheConfigurations.put(CacheNames.PRODUCT_BY_USER_AND_ID, defaultCacheConfig.entryTtl(Duration.ofSeconds(60)));

        cacheConfigurations.put(CacheNames.SUPPLIERS_BY_USER, defaultCacheConfig.entryTtl(Duration.ofSeconds(90)));
        cacheConfigurations.put(CacheNames.SUPPLIER_BY_USER_AND_ID, defaultCacheConfig.entryTtl(Duration.ofSeconds(120)));

        cacheConfigurations.put(CacheNames.TOTAL_PROFIT_BY_USER, defaultCacheConfig.entryTtl(Duration.ofSeconds(20)));
        cacheConfigurations.put(CacheNames.LATEST_PROFIT_BY_USER, defaultCacheConfig.entryTtl(Duration.ofSeconds(20)));

        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(defaultCacheConfig)
                .withInitialCacheConfigurations(cacheConfigurations)
                .build();
    }

    @Bean
    @ConditionalOnMissingBean(CacheManager.class)
    public CacheManager localCacheManager() {
        ConcurrentMapCacheManager cacheManager = new ConcurrentMapCacheManager(CacheNames.ALL_CACHES);
        cacheManager.setAllowNullValues(false);
        return cacheManager;
    }
}
