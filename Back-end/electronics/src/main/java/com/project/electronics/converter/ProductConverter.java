package com.project.electronics.converter;

import com.project.electronics.dto.response.HomeProductResponse;
import com.project.electronics.models.ProductEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class ProductConverter {
    @Autowired
    private ModelMapper modelMapper;

    public HomeProductResponse toHomeProductResponse(ProductEntity productEntity) {
        HomeProductResponse categoryResponse = modelMapper.map(productEntity, HomeProductResponse.class);
        return categoryResponse;
    }

}
