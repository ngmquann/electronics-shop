package com.project.electronics.controller;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.dto.request.CartChangeRequest;
import com.project.electronics.dto.request.CartRequest;
import com.project.electronics.dto.response.CartResponse;
import com.project.electronics.dto.response.CategoryResponse;
import com.project.electronics.service.impl.CartService;
import com.project.electronics.service.impl.CategoryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/by-user")
    public ResponseEntity<?> getCartByUser(HttpServletRequest request) {
            String headerAuth = request.getHeader("Authorization");
            if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
            }
            String token = headerAuth.substring(7);

            Long userId = jwtTokenUtil.extractUserId(token);

            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expired");
            }
        List<CartResponse> cartResponse = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cartResponse);
    }
    @PostMapping("/change-quantity")
    public ResponseEntity<?> changeQuantity(@RequestBody CartChangeRequest cartChangeRequest, HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }
        String token = headerAuth.substring(7);

        Long userId = jwtTokenUtil.extractUserId(token);

        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expired");
        }
        boolean check = cartService.changeQuantity(cartChangeRequest,userId);
        if (check) {
            return ResponseEntity.status(HttpStatus.OK).body("Quantity changed");
        }
        return ResponseEntity.badRequest().body("Quantity not changed");
    }
    @PostMapping("/add")
    public ResponseEntity<?> addCart(@RequestBody CartRequest cartRequest, HttpServletRequest request) {
        boolean check = cartService.addCart(cartRequest,request);
        if (check){
            return ResponseEntity.status(HttpStatus.OK).body("Cart added");
        }
        return ResponseEntity.badRequest().body("Cart not changed");
    }


}

