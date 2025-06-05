package abhishek.stockviewbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record StockData(
        @JsonProperty("symbol")
        String symbol,

        @JsonProperty("price")
        double price,

        @JsonProperty("change")
        double change,

        @JsonProperty("changePercent")
        String changePercent
) {}