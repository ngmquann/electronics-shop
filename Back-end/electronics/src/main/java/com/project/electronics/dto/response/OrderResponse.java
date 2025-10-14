package com.project.electronics.dto.response;


import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private String address;
    private Double total;
    private String methodDelivery;
    private String methodPayment;
    private String statusMethodDelivery;
    private String createdAt;
    private String updatedAt;
    private UserBriefDto user;
    private List<OrderItemResponse> items;
}
