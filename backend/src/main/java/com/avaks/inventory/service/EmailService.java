package com.avaks.inventory.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String senderEmail;

    public void sendOtpEmail(String to, String storeName, String otp, long expiryMinutes) {
        String html = """
                <html>
                <body style='margin:0;padding:0;background:#0b1220;color:#e5e7eb;font-family:Arial,sans-serif;'>
                  <div style='max-width:600px;margin:24px auto;background:#111827;border:1px solid #1f2937;border-radius:14px;overflow:hidden;'>
                    <div style='padding:28px 28px 0 28px;text-align:center;'>
                      <img src='cid:logoImage' alt='Inventory Logo' style='height:56px;object-fit:contain;' />
                      <h2 style='margin:18px 0 8px 0;color:#f9fafb;'>Verify your account</h2>
                      <p style='margin:0;color:#9ca3af;'>Your one-time password for %s</p>
                    </div>
                    <div style='padding:24px 28px;'>
                      <div style='text-align:center;background:#0f172a;border:1px dashed #334155;border-radius:10px;padding:18px;'>
                        <div style='font-size:34px;letter-spacing:6px;font-weight:800;color:#f8fafc;'>%s</div>
                      </div>
                      <p style='margin:18px 0 0 0;color:#93c5fd;'>This OTP will expire in %d minutes.</p>
                      <p style='margin:10px 0 0 0;color:#9ca3af;font-size:14px;'>If you did not request this email, you can safely ignore it.</p>
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(escape(storeName), escape(otp), expiryMinutes);

        sendHtmlWithLogo(to, "Your Inventory OTP Code", html);
    }

    public void sendWelcomeEmail(String to, String storeName) {
        String html = """
                <html>
                <body style='margin:0;padding:0;background:#0b1220;color:#e5e7eb;font-family:Arial,sans-serif;'>
                  <div style='max-width:600px;margin:24px auto;background:#111827;border:1px solid #1f2937;border-radius:14px;overflow:hidden;'>
                    <div style='padding:28px;text-align:center;'>
                      <img src='cid:logoImage' alt='Inventory Logo' style='height:56px;object-fit:contain;' />
                      <h2 style='margin:18px 0 8px 0;color:#f9fafb;'>Welcome to Inventory Management</h2>
                      <p style='margin:0;color:#9ca3af;'>Your store <strong style='color:#e2e8f0;'>%s</strong> is now verified.</p>
                      <p style='margin:18px 0 0 0;color:#cbd5e1;'>You can now log in and start managing products, suppliers, orders, and sales securely.</p>
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(escape(storeName));

        sendHtmlWithLogo(to, "Welcome to Inventory Management", html);
    }

    public void sendPasswordResetOtpEmail(String to, String storeName, String otp, long expiryMinutes) {
        String html = """
                <html>
                <body style='margin:0;padding:0;background:#0b1220;color:#e5e7eb;font-family:Arial,sans-serif;'>
                  <div style='max-width:600px;margin:24px auto;background:#111827;border:1px solid #1f2937;border-radius:14px;overflow:hidden;'>
                    <div style='padding:28px 28px 0 28px;text-align:center;'>
                      <img src='cid:logoImage' alt='Inventory Logo' style='height:56px;object-fit:contain;' />
                      <h2 style='margin:18px 0 8px 0;color:#f9fafb;'>Reset your password</h2>
                      <p style='margin:0;color:#9ca3af;'>Use this OTP to set a new password for %s</p>
                    </div>
                    <div style='padding:24px 28px;'>
                      <div style='text-align:center;background:#0f172a;border:1px dashed #334155;border-radius:10px;padding:18px;'>
                        <div style='font-size:34px;letter-spacing:6px;font-weight:800;color:#f8fafc;'>%s</div>
                      </div>
                      <p style='margin:18px 0 0 0;color:#93c5fd;'>This OTP will expire in %d minutes.</p>
                      <p style='margin:10px 0 0 0;color:#9ca3af;font-size:14px;'>If you did not request a password reset, ignore this email.</p>
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(escape(storeName), escape(otp), expiryMinutes);

        sendHtmlWithLogo(to, "Inventory Password Reset OTP", html);
    }

    private void sendHtmlWithLogo(String to, String subject, String htmlBody) {
        if (senderEmail == null || senderEmail.isBlank()) {
          throw new IllegalStateException("Mail sender is not configured. Set MAIL_USERNAME in environment.");
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());
            helper.setFrom(senderEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            helper.addInline("logoImage", new ClassPathResource("static/logo-white-bg.png"));
            mailSender.send(message);
        } catch (MessagingException ex) {
            throw new IllegalStateException("Failed to send email", ex);
        }
    }

    private String escape(String value) {
        if (value == null) {
            return "";
        }
        return value.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
