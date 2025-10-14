package com.project.electronics.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartRequest {
    private Integer quantity;
    private Long productId;
    private Long colorId;
    private Long memoryId;
}

