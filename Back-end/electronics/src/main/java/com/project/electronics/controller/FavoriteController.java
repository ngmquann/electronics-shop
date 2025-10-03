package com.project.electronics.controller;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.dto.request.ToggleFavorite;
import com.project.electronics.service.impl.FavoriteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/favorite")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/toggle")
    public ResponseEntity<?> toggleFavorite(@RequestBody ToggleFavorite toggleFavorite, HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }
        String token = headerAuth.substring(7);

        Long userId = jwtTokenUtil.extractUserId(token);

        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expired");
        }
        boolean check = favoriteService.toggleFavorite(toggleFavorite.getProductId(),userId);
        String message = "";
        if(check){
            message = "Thêm vào yêu thích thành công!";
        }else
            message = "Xóa khỏi yêu thích thành công!";
        return ResponseEntity.ok(message);
    }

}

