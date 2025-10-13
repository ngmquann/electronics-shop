package com.project.electronics.converter;

import com.project.electronics.dto.request.CategoryRequest;
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
    public CategoryEntity toEntity(CategoryRequest req) {
        return CategoryEntity.builder()
                .id(req.getId())
                .name(req.getName())
                .build();
    }
    public void updateEntity(CategoryEntity entity, CategoryRequest req) {
        entity.setName(req.getName());
    }


}
