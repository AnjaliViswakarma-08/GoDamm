package com.avaks.inventory.controller;

import com.avaks.inventory.service.UserService;
import com.avaks.inventory.dto.auth.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("/store-name")
    public ResponseEntity<?> updateStoreName(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> request) {

        String newStoreName = request.get("storeName");
        if (newStoreName == null || newStoreName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Store name cannot be empty"));
        }

        // We assume username in UserDetails is the email
        String email = userDetails.getUsername();
        // Since we need the ID, we'll fetch user by email first or modify UserService
        // For simplicity, let's assume we can find the user or modify UserService to
        // take email

        // Wait, I already have CustomUserDetailsService. Let's get the user.
        // Actually, let's just use email in UserService too.
        return ResponseEntity.ok(userService.updateStoreNameByEmail(email, newStoreName));
    }
}
