package com.project.electronics.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AIProductResponse {
    private Long id;
    private String name;
    private String categoryName;
    private String description;
    private String image;
}
