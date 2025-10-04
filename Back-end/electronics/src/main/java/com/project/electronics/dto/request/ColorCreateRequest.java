package com.project.electronics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ColorCreateRequest {
    @NotNull
    private Double price;
    @NotBlank(message = "Color name is required")
    private String name;
}