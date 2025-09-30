package com.project.electronics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestClientCustomizer;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.zalando.logbook.Logbook;
import org.zalando.logbook.spring.LogbookClientHttpRequestInterceptor;


@EnableAsync(proxyTargetClass = true)
@EnableFeignClients
@SpringBootApplication
public class ElectronicsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElectronicsApplication.class, args);
	}
	@Bean
	public RestClientCustomizer restClientCustomizer(Logbook logbook) {
		return restClientBuilder -> restClientBuilder.requestInterceptor(new LogbookClientHttpRequestInterceptor(logbook));
	}
}
