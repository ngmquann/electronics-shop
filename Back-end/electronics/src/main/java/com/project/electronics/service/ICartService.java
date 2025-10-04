package com.project.electronics.service;

import com.project.electronics.dto.request.CartChangeRequest;
import com.project.electronics.dto.request.CartRequest;
import com.project.electronics.dto.response.CartResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

public interface ICartService {
    List<CartResponse> getCartByUserId(Long userId);
    boolean changeQuantity(CartChangeRequest cartChangeRequest, Long userId);
    boolean addCart(CartRequest cartRequest, HttpServletRequest httpServletRequest);
}
