package abhishek.stockviewbackend.controller;

import abhishek.stockviewbackend.dto.HistoricalData;
import abhishek.stockviewbackend.dto.StockData;
import abhishek.stockviewbackend.service.AlphaVantageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final AlphaVantageService alphaVantageService;

    public StockController(AlphaVantageService alphaVantageService) {
        this.alphaVantageService = alphaVantageService;
    }

    @GetMapping("/{symbol}")
    public ResponseEntity<StockData> getStockData(@PathVariable String symbol) {
        return ResponseEntity.ok(alphaVantageService.getStockQuote(symbol));
    }

    @GetMapping("/{symbol}/history")
    public ResponseEntity<List<HistoricalData>> getHistoricalData(
            @PathVariable String symbol,
            @RequestParam(defaultValue = "daily") String interval) {
        return ResponseEntity.ok(alphaVantageService.getHistoricalData(symbol, interval));
    }
}
