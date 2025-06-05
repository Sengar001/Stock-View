package abhishek.stockviewbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public record AlertRequest(
        @NotNull(message = "Symbol must not be null")
        @JsonProperty("symbol")
        String symbol,

        @NotNull(message = "Target price must not be null")
        @Positive(message = "Target price must be positive")
        @JsonProperty("targetPrice")
        BigDecimal targetPrice
) {}
