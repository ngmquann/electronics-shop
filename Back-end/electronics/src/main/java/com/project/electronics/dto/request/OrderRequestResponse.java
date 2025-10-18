package com.project.electronics.dto.request;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestResponse {
    private Long orderId;
    private Double total;
    private String methodPayment;
    private String methodDelivery;
    private String address;
}
