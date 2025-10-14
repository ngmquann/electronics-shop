package com.project.electronics.service;

import com.project.electronics.dto.request.ChangeStatusRequest;
import com.project.electronics.dto.request.OrderRequest;
import com.project.electronics.dto.response.OrderResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IOrderService {
    List<OrderResponse> getAllOrderResponseList();
    String addOrder(OrderRequest orderRequest, HttpServletRequest httpServletRequest);
    String changeStatusDelivery(ChangeStatusRequest request);
}
