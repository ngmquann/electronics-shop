package com.project.electronics.service;


import com.project.electronics.dto.request.ProductCreateRequest;
import com.project.electronics.dto.response.HomeProductResponse;
import com.project.electronics.dto.response.ProductResponse;
import com.project.electronics.dto.response.ProductSearchResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IProductService {
    List<HomeProductResponse> getRanDomHome(int number, HttpServletRequest request);
    List<ProductSearchResponse> searchByName(String name);
    List<HomeProductResponse> getAllByCategory(Long categoryId, HttpServletRequest request);
    String create(ProductCreateRequest req);
    ProductResponse getProductById(Long id);
}

