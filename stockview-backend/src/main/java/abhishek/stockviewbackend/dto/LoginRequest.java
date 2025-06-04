package abhishek.stockviewbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotNull(message = "Email must not be null")
        @Email(message = "Email should be valid")
        @JsonProperty("email")
        String email,

        @NotNull(message = "Password must not be null")
        @Size(min = 6, max = 40, message = "Password must be between 6 and 40 characters")
        @JsonProperty("password")
        String password
) {}