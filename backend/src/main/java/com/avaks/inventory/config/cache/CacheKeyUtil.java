package com.avaks.inventory.config.cache;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class CacheKeyUtil {

    private CacheKeyUtil() {
    }

    public static String currentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            return "anonymous";
        }
        return authentication.getName().toLowerCase();
    }

    public static String forCurrentUserWithId(Long id) {
        return currentUserEmail() + ":" + id;
    }
}
