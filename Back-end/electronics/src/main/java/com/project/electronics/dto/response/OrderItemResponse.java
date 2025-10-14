package com.project.electronics.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponse {
    private Long id;
    private Integer quantity;
    private String productName;
    private String memoryName;
    private Double memoryPrice;
    private Double colorPrice;
    private String colorName;
}