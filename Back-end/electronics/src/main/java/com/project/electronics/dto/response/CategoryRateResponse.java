package com.project.electronics.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRateResponse {
    private String name;
    private int percent;
}

