package com.project.electronics.service;

import com.project.electronics.dto.response.CartResponse;

import java.util.List;

public interface ICartService {
    List<CartResponse> getCartByUserId(Long userId);
}
