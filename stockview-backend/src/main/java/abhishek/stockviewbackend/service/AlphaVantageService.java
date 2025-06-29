package abhishek.stockviewbackend.service;

import abhishek.stockviewbackend.dto.HistoricalData;
import abhishek.stockviewbackend.dto.StockData;
import abhishek.stockviewbackend.util.RestTemplateUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AlphaVantageService {

    @Value("${alpha.vantage.api.key}")
    private String apiKey1;
    @Value("${finnhub.api.key}")
    private String apiKey2;

    private final RestTemplate restTemplate;

    public AlphaVantageService(RestTemplateUtil restTemplateUtil) {
        this.restTemplate = restTemplateUtil.getRestTemplate();
    }

    public StockData getStockQuote(String symbol) {
        String url = "https://finnhub.io/api/v1/quote";

        URI uri = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("symbol", symbol)
                .queryParam("token", apiKey2)
                .build()
                .toUri();

        var response = restTemplate.getForObject(uri, Map.class);

        if (response == null || response.get("c") == null) {
            throw new RuntimeException("API error or invalid stock symbol.");
        }

        double currentPrice = ((Number) response.get("c")).doubleValue(); // Current price
        double previousClose = ((Number) response.get("pc")).doubleValue(); // Previous close
        double change = currentPrice - previousClose;
        double changePercent = (change / previousClose) * 100;

        return new StockData(
                symbol,
                currentPrice,
                change,
                String.format("%.2f%%", changePercent)
        );
    }

    @Cacheable(value = "stockHistory", key = "{#symbol, #interval}")
    public List<HistoricalData> getHistoricalData(String symbol, String interval) {
        String function = getFunctionForInterval(interval);
        String responseKey = getResponseKeyForFunction(function);
        String url = "https://www.alphavantage.co/query";

        URI uri = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("function", function)
                .queryParam("symbol", symbol)
                .queryParam("apikey", apiKey1)
                .build()
                .toUri();

        Map<String, Object> response = restTemplate.getForObject(uri, Map.class);

        // Handle API limitations
        if (response == null || response.containsKey("Note") || response.containsKey("Error Message")) {
            throw new RuntimeException("API error: " + response.getOrDefault("Note", "Invalid response"));
        }

        // Get the correct time series key
        Map<String, Map<String, String>> timeSeries = (Map<String, Map<String, String>>) response.get(responseKey);

        if (timeSeries == null) {
            throw new RuntimeException("No historical data found for " + symbol);
        }

        List<HistoricalData> data = new ArrayList<>();
        timeSeries.forEach((date, values) -> {
            String closePrice = values.get("4. close");
            data.add(new HistoricalData(date, Double.parseDouble(closePrice)));
        });

        return data.stream()
                .sorted(Comparator.comparing(HistoricalData::date))
                .collect(Collectors.toList());
    }

    private String getFunctionForInterval(String interval) {
        return switch (interval.toLowerCase()) {
            case "weekly" -> "TIME_SERIES_WEEKLY";
            case "monthly" -> "TIME_SERIES_MONTHLY";
            default -> "TIME_SERIES_DAILY";  // Daily is default
        };
    }

    // Maps API function to actual response key
    private String getResponseKeyForFunction(String function) {
        return switch (function) {
            case "TIME_SERIES_WEEKLY" -> "Weekly Time Series";
            case "TIME_SERIES_MONTHLY" -> "Monthly Time Series";
            default -> "Time Series (Daily)";  // Daily is default
        };
    }
}