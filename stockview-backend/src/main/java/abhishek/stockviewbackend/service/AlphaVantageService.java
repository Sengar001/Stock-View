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
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AlphaVantageService {

    @Value("${alpha.vantage.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public AlphaVantageService(RestTemplateUtil restTemplateUtil) {
        this.restTemplate = restTemplateUtil.getRestTemplate();
    }

    public StockData getStockQuote(String symbol) {
        String url = "https://www.alphavantage.co/query";

        URI uri = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("function", "GLOBAL_QUOTE")
                .queryParam("symbol", symbol)
                .queryParam("apikey", apiKey)
                .build()
                .toUri();

        Map<String, Map<String, String>> response = restTemplate.getForObject(uri, Map.class);
        Map<String, String> quote = response.get("Global Quote");

        return new StockData(
                symbol,
                Double.parseDouble(quote.get("05. price")),
                Double.parseDouble(quote.get("09. change")),
                quote.get("10. change percent")
        );
    }

    @Cacheable("stockHistory")
    public List<HistoricalData> getHistoricalData(String symbol, String interval) {
        String function = getFunctionForInterval(interval);
        String url = "https://www.alphavantage.co/query";

        URI uri = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("function", function)
                .queryParam("symbol", symbol)
                .queryParam("apikey", apiKey)
                .build()
                .toUri();

        Map<String, Map<String, Map<String, String>>> response = restTemplate.getForObject(uri, Map.class);
        Map<String, Map<String, String>> timeSeries = response.get(function.substring(11));

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
            default -> "TIME_SERIES_DAILY";
        };
    }
}