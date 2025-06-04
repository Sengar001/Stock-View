package abhishek.stockviewbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record JwtResponse(
        @JsonProperty("token")
        String token
) {}
