package com.project.electronics.service;


import com.project.electronics.dto.response.HomeProductResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IProductService {
    List<HomeProductResponse> getRanDomHome(int number, HttpServletRequest request);
}

