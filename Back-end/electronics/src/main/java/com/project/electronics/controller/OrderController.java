package com.project.electronics.controller;


import com.project.electronics.dto.request.ChangeStatusRequest;
import com.project.electronics.dto.request.OrderRequest;
import com.project.electronics.dto.response.OrderResponse;
import com.project.electronics.service.impl.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> orderProduct(@RequestBody OrderRequest orderRequest, HttpServletRequest request) {
        String message = orderService.addOrder(orderRequest,request);
        return ResponseEntity.ok(Map.of("message", message));
    }
    @GetMapping("/by-admin")
    public ResponseEntity<?> getAllOrderByAdmin() {
        List<OrderResponse> result = orderService.getAllOrderResponseList();
        return ResponseEntity.ok(result);
    }
    @PostMapping("/change-status")
    public ResponseEntity<?> changeStatusDelivery(@RequestBody ChangeStatusRequest request) {
        String message =  orderService.changeStatusDelivery(request);
        return ResponseEntity.ok(Map.of("message", message));
    }

}
