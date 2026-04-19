package com.avaks.inventory.service;

import com.avaks.inventory.exception.OtpVerificationException;
import com.avaks.inventory.model.User;
import com.avaks.inventory.model.UserOtp;
import com.avaks.inventory.repository.UserOtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final UserOtpRepository userOtpRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.otp.expiration-minutes:10}")
    private long otpExpirationMinutes;

    @Transactional
    public String generateAndStoreOtp(User user) {
        String otp = String.format("%06d", secureRandom.nextInt(1_000_000));
        userOtpRepository.deleteByUserId(user.getId());

        UserOtp userOtp = new UserOtp();
        userOtp.setUser(user);
        userOtp.setOtp(otp);
        userOtp.setExpiresAt(LocalDateTime.now().plusMinutes(otpExpirationMinutes));
        userOtpRepository.save(userOtp);
        return otp;
    }

    @Transactional(readOnly = true)
    public void verifyOtp(User user, String otp) {
        UserOtp latestOtp = userOtpRepository.findTopByUserIdOrderByCreatedAtDesc(user.getId())
                .orElseThrow(() -> new OtpVerificationException("Invalid OTP"));

        if (LocalDateTime.now().isAfter(latestOtp.getExpiresAt())) {
            throw new OtpVerificationException("OTP has expired");
        }

        if (!latestOtp.getOtp().equals(otp)) {
            throw new OtpVerificationException("Invalid OTP");
        }
    }

    @Transactional
    public void clearOtp(User user) {
        userOtpRepository.deleteByUserId(user.getId());
    }
}
