package com.avaks.inventory.controller;

import com.avaks.inventory.dto.auth.AuthResponse;
import com.avaks.inventory.dto.auth.ForgotPasswordRequest;
import com.avaks.inventory.dto.auth.LoginRequest;
import com.avaks.inventory.dto.auth.MessageResponse;
import com.avaks.inventory.dto.auth.RegisterRequest;
import com.avaks.inventory.dto.auth.ResetPasswordRequest;
import com.avaks.inventory.dto.auth.VerifyOtpRequest;
import com.avaks.inventory.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MessageResponse("Registration successful. Please verify OTP sent to your email."));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        AuthResponse response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password/request")
    public ResponseEntity<MessageResponse> requestPasswordResetOtp(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.requestPasswordResetOtp(request);
        return ResponseEntity.ok(new MessageResponse("If the email is registered, an OTP has been sent."));
    }

    @PostMapping("/forgot-password/verify-otp")
    public ResponseEntity<MessageResponse> verifyForgotPasswordOtp(@Valid @RequestBody VerifyOtpRequest request) {
        authService.verifyForgotPasswordOtp(request);
        return ResponseEntity.ok(new MessageResponse("OTP verified successfully."));
    }

    @PostMapping("/forgot-password/reset")
    public ResponseEntity<MessageResponse> resetForgotPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetForgotPassword(request);
        return ResponseEntity.ok(new MessageResponse("Password reset successful."));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
