package abhishek.stockviewbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record StockDTO(
        @NotNull(message = "Symbol must not be null")
        @Size(min = 1, max = 10, message = "Symbol must be 1-10 characters")
        @JsonProperty("symbol")
        String symbol,

        @NotNull(message = "Name must not be null")
        @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
        @JsonProperty("name")
        String name
) {}
