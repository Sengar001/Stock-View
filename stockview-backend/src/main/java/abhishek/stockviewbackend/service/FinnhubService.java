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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FinnhubService {

    @Value("${finnhub.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public FinnhubService(RestTemplateUtil restTemplateUtil) {
        this.restTemplate = restTemplateUtil.getRestTemplate();
    }

    public StockData getStockQuote(String symbol) {
        String url = "https://finnhub.io/api/v1/quote";

        URI uri = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("symbol", symbol)
                .queryParam("token", apiKey)
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
        String resolution = getResolution(interval);

        long now = Instant.now().getEpochSecond();
        long from = LocalDate.now().minusDays(100).atStartOfDay().toEpochSecond(ZoneOffset.UTC);  // ~100 days back

        String url = "https://finnhub.io/api/v1/stock/candle";

        URI uri = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("symbol", symbol)
                .queryParam("resolution", resolution)
                .queryParam("from", from)
                .queryParam("to", now)
                .queryParam("token", apiKey)
                .build()
                .toUri();

        var response = restTemplate.getForObject(uri, Map.class);

        if (response == null || !"ok".equalsIgnoreCase((String) response.get("s"))) {
            throw new RuntimeException("No historical data found for " + symbol);
        }

        List<HistoricalData> data = new ArrayList<>();
        List<Long> timestamps = (List<Long>) response.get("t");
        List<Double> closes = (List<Double>) response.get("c");

        for (int i = 0; i < timestamps.size(); i++) {
            String date = Instant.ofEpochSecond(timestamps.get(i)).atZone(ZoneOffset.UTC).toLocalDate().toString();
            data.add(new HistoricalData(date, closes.get(i)));
        }

        return data;
    }

    private String getResolution(String interval) {
        return switch (interval.toLowerCase()) {
            case "weekly" -> "W";
            case "monthly" -> "M";
            default -> "D"; // Daily is default
        };
    }
}

