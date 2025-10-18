package com.project.electronics.controller;


import com.project.electronics.dto.request.ChangeStatusRequest;
import com.project.electronics.dto.request.OrderRequestResponse;
import com.project.electronics.dto.response.OrderResponse;
import com.project.electronics.service.impl.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/booking")
    public ResponseEntity<?> orderProduct(
            @RequestParam Long orderId,
            @RequestParam Double total,
            @RequestParam String methodPayment,
            @RequestParam String methodDelivery,
            @RequestParam String address
    ) {
        OrderRequestResponse response = OrderRequestResponse.builder()
                .orderId(orderId)
                .total(total)
                .methodPayment(methodPayment)
                .methodDelivery(methodDelivery)
                .address(address)
                .build();

        String result = orderService.addOrder(response);


        URI fe = UriComponentsBuilder
                .fromHttpUrl("http://localhost:5173/payment/result")
                .queryParam("status", "success")
                .queryParam("code", "00")
                .queryParam("message", result)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();


        return ResponseEntity.status(302).location(fe).build();
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
