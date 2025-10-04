package com.project.electronics.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartChangeRequest {
    private Long id;
    private Integer quantity;
}