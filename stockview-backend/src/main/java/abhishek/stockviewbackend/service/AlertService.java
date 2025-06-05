package abhishek.stockviewbackend.service;

import abhishek.stockviewbackend.dto.AlertRequest;
import abhishek.stockviewbackend.entity.Alert;
import abhishek.stockviewbackend.entity.Stock;
import abhishek.stockviewbackend.entity.User;
import abhishek.stockviewbackend.exception.ResourceNotFoundException;
import abhishek.stockviewbackend.repository.AlertRepository;
import abhishek.stockviewbackend.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;
    private final StockRepository stockRepository;

    @Transactional
    public Alert createAlert(User user, AlertRequest request) {
        Stock stock = stockRepository.findById(request.symbol())
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with symbol: " + request.symbol()));

        Alert alert = new Alert();
        alert.setUser(user);
        alert.setStock(stock);
        alert.setTargetPrice(request.targetPrice());
        return alertRepository.save(alert);
    }
}
