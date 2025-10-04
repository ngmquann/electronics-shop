package com.project.electronics.service.impl;

import com.project.electronics.converter.CategoryConverter;
import com.project.electronics.dto.response.CategoryResponse;
import com.project.electronics.repository.CategoryRepository;
import com.project.electronics.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryConverter categoryConverter;

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryConverter::toCategoryResponse)
                .toList();
    }

}
