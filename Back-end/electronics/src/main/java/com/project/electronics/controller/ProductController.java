package com.project.electronics.controller;

import com.project.electronics.dto.request.ProductNumber;
import com.project.electronics.dto.response.HomeProductResponse;
import com.project.electronics.service.impl.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/random")
    public ResponseEntity<?> randomHomeProducts(@RequestBody ProductNumber number, HttpServletRequest request) {

        List<HomeProductResponse> data = productService.getRanDomHome(number.getNumber(), request);
        return ResponseEntity.ok(data);
    }

}

