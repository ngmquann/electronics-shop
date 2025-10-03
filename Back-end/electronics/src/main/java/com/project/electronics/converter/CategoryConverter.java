package com.project.electronics.converter;

import com.project.electronics.dto.response.CategoryResponse;
import com.project.electronics.models.CategoryEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class CategoryConverter {
    @Autowired
    private ModelMapper modelMapper;

    public CategoryResponse toCategoryResponse(CategoryEntity categoryEntity) {
        CategoryResponse categoryResponse = modelMapper.map(categoryEntity, CategoryResponse.class);

        return categoryResponse;
    }

}
