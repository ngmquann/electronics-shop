package com.project.electronics.service;

import com.project.electronics.dto.request.ChangeStatusRequest;
import com.project.electronics.dto.request.OrderRequestResponse;
import com.project.electronics.dto.response.OrderResponse;

import java.util.List;

public interface IOrderService {
    List<OrderResponse> getAllOrderResponseList();
    String addOrder(OrderRequestResponse orderRequest);
    String changeStatusDelivery(ChangeStatusRequest request);
    List<OrderResponse> getAllOrderResponseByUser(Long userId);
    OrderResponse getOrderById(Long orderId);
}
