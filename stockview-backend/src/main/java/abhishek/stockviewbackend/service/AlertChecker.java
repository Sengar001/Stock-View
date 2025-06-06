package abhishek.stockviewbackend.service;

import abhishek.stockviewbackend.entity.Alert;
import abhishek.stockviewbackend.repository.AlertRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Component
public class AlertChecker {

    private static final Logger logger = LoggerFactory.getLogger(AlertChecker.class);

    private final AlertRepository alertRepository;
    private final AlphaVantageService alphaVantageService;
    private final EmailService emailService;

    public AlertChecker(AlertRepository alertRepository,
                        AlphaVantageService alphaVantageService,
                        EmailService emailService) {
        this.alertRepository = alertRepository;
        this.alphaVantageService = alphaVantageService;
        this.emailService = emailService;
    }

    @Scheduled(fixedRate = 60000) // Run every minute (60,000 ms)
    @Transactional
    public void checkPriceAlerts() {
        logger.info("Starting alert check...");

        // Get all active alerts that haven't been triggered
        List<Alert> activeAlerts = alertRepository.findByTriggeredFalse();

        if (activeAlerts.isEmpty()) {
            logger.info("No active alerts to check");
            return;
        }

        logger.info("Checking {} active alerts", activeAlerts.size());

        for (Alert alert : activeAlerts) {
            try {
                String symbol = alert.getStock().getSymbol();
                BigDecimal targetPrice = alert.getTargetPrice();

                // Get current stock price
                BigDecimal currentPrice = BigDecimal.valueOf(
                        alphaVantageService.getStockQuote(symbol).price()
                );

                logger.debug("Checking alert: {} | Target: {} | Current: {}",
                        symbol, targetPrice, currentPrice);

                // Check if alert condition is met
                if (currentPrice.compareTo(targetPrice) >= 0) {
                    logger.info("Alert triggered for {} ({}). Price: {} >= Target: {}",
                            symbol, alert.getUser().getEmail(), currentPrice, targetPrice);

                    // Update alert status
                    alert.setTriggered(true);
                    alertRepository.save(alert);

                    // Send email notification
                    emailService.sendAlertNotification(
                            alert.getUser().getEmail(),
                            symbol,
                            targetPrice,
                            currentPrice
                    );
                }
            } catch (Exception e) {
                logger.error("Error processing alert {}: {}", alert.getId(), e.getMessage());
                // Continue processing other alerts even if one fails
            }
        }

        logger.info("Completed alert check");
    }
}
