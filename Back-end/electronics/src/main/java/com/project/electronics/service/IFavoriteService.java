package com.project.electronics.service;

import com.project.electronics.dto.response.HomeProductResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IFavoriteService {
    boolean toggleFavorite(Long productId, Long userId);
    List<HomeProductResponse> getAllFavoriteByUser(HttpServletRequest request);
}
