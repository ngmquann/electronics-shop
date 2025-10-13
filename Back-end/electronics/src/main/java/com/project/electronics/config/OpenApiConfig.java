package com.project.electronics.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI electronicsOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Electronics API")
                .description("Tài liệu API cho hệ thống Electronics")
                .version("v1.0"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .packagesToScan("com.project.electronics")
                .pathsToMatch("/api/**")
                .build();
    }
}
