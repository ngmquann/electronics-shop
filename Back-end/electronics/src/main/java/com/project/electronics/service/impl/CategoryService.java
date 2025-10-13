package com.project.electronics.service.impl;

import com.project.electronics.converter.CategoryConverter;
import com.project.electronics.customexceptions.DataNotFoundException;
import com.project.electronics.dto.request.CategoryRequest;
import com.project.electronics.dto.response.CategoryResponse;
import com.project.electronics.models.CategoryEntity;
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

    @Override
    public CategoryResponse getCategoryById(Long id) {
        CategoryEntity found = categoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Category not found with id: " + id));
        return categoryConverter.toCategoryResponse(found);
    }

    @Override
    public String createCategory(CategoryRequest request) {
        if (categoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException("Category name already exists");
        }
        CategoryEntity entity = categoryConverter.toEntity(request);
        categoryRepository.save(entity);
        return "Category created";
    }

    @Override
    public String updateCategory(Long id, CategoryRequest request) {
        CategoryEntity existing = categoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Category not found with id: " + id));

        if (!existing.getName().equalsIgnoreCase(request.getName())
                && categoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException("Category name already exists");
        }

        categoryConverter.updateEntity(existing, request);
        categoryRepository.save(existing);
        return "Category updated";
    }

    @Override
    public String deleteCategory(Long id) {
        CategoryEntity existing = categoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(existing);
        return "Category deleted";
    }

}
