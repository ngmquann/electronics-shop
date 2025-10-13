package com.project.electronics.controller;

import com.project.electronics.dto.request.CategoryRequest;
import com.project.electronics.dto.request.UserRequestAdmin;
import com.project.electronics.dto.response.CategoryResponse;
import com.project.electronics.service.impl.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllCategories() {
        List<CategoryResponse> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    @GetMapping("/get-by/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable Long id) {
        CategoryResponse data = categoryService.getCategoryById(id);
        return ResponseEntity.ok(data);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryRequest request) {
        String msg = categoryService.createCategory(request);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "message", msg
        ));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateCategory(@PathVariable Long id,
                                                              @Valid @RequestBody CategoryRequest request) {
        String msg = categoryService.updateCategory(id, request);
        return ResponseEntity.ok(Map.of("message", msg));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable Long id) {
        String msg = categoryService.deleteCategory(id);
        return ResponseEntity.ok(Map.of("message", msg));
    }
}


