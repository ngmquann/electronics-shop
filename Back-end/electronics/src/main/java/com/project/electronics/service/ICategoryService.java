package com.project.electronics.service;


import com.project.electronics.dto.response.CategoryResponse;

import java.util.List;

public interface ICategoryService {
    List<CategoryResponse> getAllCategories();
}

