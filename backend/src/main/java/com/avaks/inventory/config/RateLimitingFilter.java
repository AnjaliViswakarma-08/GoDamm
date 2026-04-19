package com.avaks.inventory.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(RateLimitingFilter.class);

    private final ObjectProvider<StringRedisTemplate> redisTemplateProvider;

    @Value("${app.rate-limit.enabled:true}")
    private boolean enabled;

    @Value("${app.rate-limit.fail-open:true}")
    private boolean failOpen;

    @Value("${app.rate-limit.window-seconds:60}")
    private long windowSeconds;

    @Value("${app.rate-limit.max-requests-per-minute:240}")
    private long maxRequestsPerWindow;

    @Value("${app.rate-limit.auth-max-requests-per-minute:60}")
    private long authMaxRequestsPerWindow;

    public RateLimitingFilter(ObjectProvider<StringRedisTemplate> redisTemplateProvider) {
        this.redisTemplateProvider = redisTemplateProvider;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        if (!enabled) {
            return true;
        }

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String path = request.getRequestURI();
        if (path == null || path.isBlank()) {
            return true;
        }

        if (path.startsWith("/actuator")) {
            return true;
        }

        return !(path.startsWith("/api") || path.startsWith("/auth"));
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        StringRedisTemplate redisTemplate = redisTemplateProvider.getIfAvailable();
        if (redisTemplate == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String path = request.getRequestURI();
        String scope = path.startsWith("/auth") ? "auth" : "api";
        long requestLimit = "auth".equals(scope) ? authMaxRequestsPerWindow : maxRequestsPerWindow;
        String key = "rate_limit:" + scope + ":" + getClientIp(request);
        Long currentCount;

        try {
            currentCount = redisTemplate.opsForValue().increment(key);
            if (currentCount != null && currentCount == 1L) {
                redisTemplate.expire(key, Duration.ofSeconds(windowSeconds));
            }
        } catch (Exception ex) {
            if (failOpen) {
                LOGGER.warn("Rate limiter failed open for path {}: {}", path, ex.getMessage());
                filterChain.doFilter(request, response);
                return;
            }

            response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Rate limiter unavailable\"}");
            return;
        }

        if (currentCount != null && currentCount > requestLimit) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.setHeader("Retry-After", String.valueOf(windowSeconds));
            response.getWriter().write("{\"error\":\"Too many requests. Please retry later.\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }

        String realIp = request.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) {
            return realIp;
        }

        return request.getRemoteAddr();
    }
}
