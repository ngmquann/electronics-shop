package com.project.electronics.config;


import com.project.electronics.filters.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static org.springframework.http.HttpMethod.*;


@Configuration
@EnableWebSecurity
@EnableWebMvc
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;
    @Value("${api.prefix}")
    private String apiPrefix;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)  throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> {
                    requests
                            .requestMatchers(
                                    "/v3/api-docs/**",
                                    "/swagger-ui/**",
                                    "/swagger-ui.html",
                                    String.format("%s/user/register", apiPrefix),
                                    String.format("%s/user/login", apiPrefix),
                                    String.format("%s/category/all", apiPrefix),
                                    String.format("%s/category/get-by/**", apiPrefix),
                                    String.format("%s/product/random", apiPrefix),
                                    String.format("%s/product/search", apiPrefix),
                                    String.format("%s/product/by-category", apiPrefix),
                                    String.format("%s/product/by-id", apiPrefix)

                            ).permitAll()
                            //product
                            .requestMatchers(POST,  "api/product/create-product").hasRole("ADMIN")
                            //associate
                            .requestMatchers( "api/associates/**").hasRole("ADMIN")
                            //user
                            .requestMatchers( POST,"api/user/add-user").hasRole("ADMIN")
                            .requestMatchers( GET,"api/user/status/**").hasRole("ADMIN")
                            .requestMatchers( GET,"api/user/all-user").hasRole("ADMIN")
                            .requestMatchers( DELETE,"api/user/by-admin/**").hasRole("ADMIN")
                            // category
                            .requestMatchers(POST,   String.format("%s/category/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(PUT,    String.format("%s/category/**", apiPrefix)).hasRole("ADMIN")
                            .requestMatchers(DELETE, String.format("%s/category/**", apiPrefix)).hasRole("ADMIN")
                            .anyRequest().authenticated();
                });
        return http.build();
    }
}

