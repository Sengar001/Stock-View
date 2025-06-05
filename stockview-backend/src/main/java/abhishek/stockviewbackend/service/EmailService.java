package abhishek.stockviewbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendAlertNotification(String toEmail, String symbol,
                                      BigDecimal targetPrice, BigDecimal currentPrice) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Stock Alert Triggered: " + symbol);
        message.setText(String.format(
                "Alert triggered for %s!\n\n" +
                        "Target price: $%,.2f\n" +
                        "Current price: $%,.2f",
                symbol, targetPrice, currentPrice
        ));

        mailSender.send(message);
    }
}
