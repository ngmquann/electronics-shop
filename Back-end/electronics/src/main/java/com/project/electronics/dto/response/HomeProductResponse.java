package com.project.electronics.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeProductResponse {
    private Long id;
    private String name;
    private String images;
    private String note;
    private Double price;
    private boolean isFavorite;
}
