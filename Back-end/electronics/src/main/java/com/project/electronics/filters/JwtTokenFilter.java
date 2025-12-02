package com.project.electronics.filters;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.models.UserEntity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    @Value("${api.prefix}")
    private String apiPrefix;

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        try {
            if (isBypassToken(request)) {
                chain.doFilter(request, response);
                return;
            }

            final String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }

            final String token = authHeader.substring(7);
            final String email = jwtTokenUtil.extractEmail(token);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserEntity userDetails = (UserEntity) userDetailsService.loadUserByUsername(email);
                if (jwtTokenUtil.validateToken(token, userDetails)) {
                    var authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
            chain.doFilter(request, response);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
    }

    private boolean isBypassToken(@NonNull HttpServletRequest request) {
        final String prefix = apiPrefix.startsWith("/") ? apiPrefix : ("/" + apiPrefix);

        List<RequestMatcher> bypass = List.of(
                // Swagger/OpenAPI
                new AntPathRequestMatcher("/v3/api-docs/**", "GET"),
                new AntPathRequestMatcher("/swagger-ui/**", "GET"),
                new AntPathRequestMatcher("/swagger-ui.html", "GET"),

                // Auth public
                new AntPathRequestMatcher(prefix + "/user/register", "POST"),
                new AntPathRequestMatcher(prefix + "/user/login", "POST"),

                // Product public
                new AntPathRequestMatcher(prefix + "/product/random", "GET"),
                new AntPathRequestMatcher(prefix + "/product/search", "GET"),
                new AntPathRequestMatcher(prefix + "/product/by-category", "GET"),
                new AntPathRequestMatcher(prefix + "/product/by-id", "GET"),

                // Category public
                new AntPathRequestMatcher(prefix + "/category/all", "GET"),
                new AntPathRequestMatcher(prefix + "/category/get-by/**", "GET"),
                //order
                new AntPathRequestMatcher(prefix + "/order/booking", "GET"),
                // ai assistant
                 new AntPathRequestMatcher(prefix + "/ai/question", "POST")
        );

        return bypass.stream().anyMatch(m -> m.matches(request));
    }
}
