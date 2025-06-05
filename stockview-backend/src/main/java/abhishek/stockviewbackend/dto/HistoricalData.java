package abhishek.stockviewbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record HistoricalData(
        @JsonProperty("date")
        String date,

        @JsonProperty("price")
        double price
) {}
