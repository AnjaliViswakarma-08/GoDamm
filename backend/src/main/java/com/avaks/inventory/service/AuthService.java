package com.avaks.inventory.service;

import com.avaks.inventory.dto.auth.AuthResponse;
import com.avaks.inventory.dto.auth.ForgotPasswordRequest;
import com.avaks.inventory.dto.auth.LoginRequest;
import com.avaks.inventory.dto.auth.RegisterRequest;
import com.avaks.inventory.dto.auth.ResetPasswordRequest;
import com.avaks.inventory.dto.auth.VerifyOtpRequest;
import com.avaks.inventory.exception.AuthException;
import com.avaks.inventory.exception.DuplicateEmailException;
import com.avaks.inventory.model.User;
import com.avaks.inventory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Pattern STRONG_PASSWORD_PATTERN = Pattern.compile(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,100}$"
    );

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final EmailService emailService;
    private final JwtService jwtService;

    @Value("${app.otp.expiration-minutes:10}")
    private long otpExpirationMinutes;

    @Transactional
    public void register(RegisterRequest request) {
        String email = normalizeEmail(request.getEmail());

        validatePasswordStrength(request.getPassword());

        User existingUser = userRepository.findByEmail(email).orElse(null);
        if (existingUser != null) {
            if (Boolean.TRUE.equals(existingUser.getIsVerified())) {
                throw new DuplicateEmailException("Email is already registered");
            }

            existingUser.setStoreName(request.getStoreName().trim());
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
            existingUser.setRole("ROLE_USER");
            existingUser.setIsVerified(false);

            User updatedUser = userRepository.save(existingUser);
            String otp = otpService.generateAndStoreOtp(updatedUser);
            emailService.sendOtpEmail(updatedUser.getEmail(), updatedUser.getStoreName(), otp, otpExpirationMinutes);
            return;
        }

        User user = new User();
        user.setEmail(email);
        user.setStoreName(request.getStoreName().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        user.setIsVerified(false);

        User savedUser = userRepository.save(user);

        String otp = otpService.generateAndStoreOtp(savedUser);
        emailService.sendOtpEmail(savedUser.getEmail(), savedUser.getStoreName(), otp, otpExpirationMinutes);
    }

    @Transactional
    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        User user = userRepository.findByEmail(normalizeEmail(request.getEmail()))
                .orElseThrow(() -> new AuthException("User not found"));

        otpService.verifyOtp(user, request.getOtp());

        boolean wasVerified = Boolean.TRUE.equals(user.getIsVerified());
        if (!wasVerified) {
            user.setIsVerified(true);
            userRepository.save(user);
            emailService.sendWelcomeEmail(user.getEmail(), user.getStoreName());
        }

        otpService.clearOtp(user);

        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getStoreName());
    }

    @Transactional
    public void requestPasswordResetOtp(ForgotPasswordRequest request) {
        String email = normalizeEmail(request.getEmail());

        userRepository.findByEmail(email).ifPresent(user -> {
            if (!Boolean.TRUE.equals(user.getIsVerified())) {
                return;
            }
            String otp = otpService.generateAndStoreOtp(user);
            emailService.sendPasswordResetOtpEmail(user.getEmail(), user.getStoreName(), otp, otpExpirationMinutes);
        });
    }

    @Transactional(readOnly = true)
    public void verifyForgotPasswordOtp(VerifyOtpRequest request) {
        User user = userRepository.findByEmail(normalizeEmail(request.getEmail()))
                .orElseThrow(() -> new AuthException("Invalid email or OTP"));

        if (!Boolean.TRUE.equals(user.getIsVerified())) {
            throw new AuthException("Email is not verified");
        }

        otpService.verifyOtp(user, request.getOtp());
    }

    @Transactional
    public void resetForgotPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(normalizeEmail(request.getEmail()))
                .orElseThrow(() -> new AuthException("Invalid email or OTP"));

        if (!Boolean.TRUE.equals(user.getIsVerified())) {
            throw new AuthException("Email is not verified");
        }

        otpService.verifyOtp(user, request.getOtp());
        validatePasswordStrength(request.getNewPassword());

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        otpService.clearOtp(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.getEmail());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException("Invalid email or password"));

        if (user.getPassword() == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("Invalid email or password");
        }

        if (!Boolean.TRUE.equals(user.getIsVerified())) {
            throw new AuthException("Email is not verified. Please verify OTP first.");
        }

        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getStoreName());
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }

    private void validatePasswordStrength(String password) {
        if (password == null || !STRONG_PASSWORD_PATTERN.matcher(password).matches()) {
            throw new AuthException("Password must include uppercase, lowercase, number, and special character (minimum 8 characters)");
        }
    }
}
