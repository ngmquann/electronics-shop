package com.project.electronics.controller;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.dto.response.HeaderHomeResponse;
import com.project.electronics.service.impl.HomeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/home")
public class HomeController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private HomeService homeService;

    @GetMapping("/header")
    public ResponseEntity<?> getHeader(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }
        String token = headerAuth.substring(7);

        Long userId = jwtTokenUtil.extractUserId(token);

        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expired");
        }

        HeaderHomeResponse response = homeService.getHeaderHome(userId);
        return ResponseEntity.ok(response);
    }
}
