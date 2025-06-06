package abhishek.stockviewbackend.util;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateUtil {

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplateBuilder()
                .errorHandler(new DefaultResponseErrorHandler())
                .build();
    }
}
