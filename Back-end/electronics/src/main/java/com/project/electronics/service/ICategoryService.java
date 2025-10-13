package com.project.electronics.service;


import com.project.electronics.dto.request.CategoryRequest;
import com.project.electronics.dto.response.CategoryResponse;

import java.util.List;

public interface ICategoryService {
    List<CategoryResponse> getAllCategories();
    CategoryResponse getCategoryById(Long id);
    String createCategory(CategoryRequest request);
    String updateCategory(Long id, CategoryRequest request);
    String deleteCategory(Long id);
}

