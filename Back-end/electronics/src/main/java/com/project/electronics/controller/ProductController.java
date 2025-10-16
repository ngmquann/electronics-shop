package com.project.electronics.controller;

import com.project.electronics.dto.request.ProductCreateRequest;
import com.project.electronics.dto.request.ProductNumber;
import com.project.electronics.dto.response.HomeProductResponse;
import com.project.electronics.dto.response.ProductResponse;
import com.project.electronics.dto.response.ProductSearchResponse;
import com.project.electronics.service.impl.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


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
    @GetMapping("/search")
    public ResponseEntity<List<ProductSearchResponse>> searchSimple(@RequestParam String name) {
        return ResponseEntity.ok(productService.searchByName(name));
    }
    @GetMapping("/by-category")
    public ResponseEntity<List<HomeProductResponse>> getAllProductByCategoryId( @RequestParam Long categoryId,HttpServletRequest request) {
        return ResponseEntity.ok(productService.getAllByCategory(categoryId,request));
    }
    @GetMapping("/by-id")
    public ResponseEntity<ProductResponse> getProductById(@RequestParam Long productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }
    @PostMapping("/create-product")
    public ResponseEntity<?> createProduct(
            @Valid @RequestBody ProductCreateRequest request,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }

       String  rs = productService.create(request);

        return ResponseEntity.ok(Map.of("message", rs));
    }
    @PostMapping("/update-product")
    public ResponseEntity<?> updateProduct(
            @Valid @RequestBody ProductCreateRequest request,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }

        String rs = productService.update(request);
        return ResponseEntity.ok(Map.of("message", rs));
    }


}

