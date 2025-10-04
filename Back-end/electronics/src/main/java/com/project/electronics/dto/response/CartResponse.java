package com.project.electronics.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse {
    private Long id;
    private Integer quantity;
    private ProductResponse product;

}
