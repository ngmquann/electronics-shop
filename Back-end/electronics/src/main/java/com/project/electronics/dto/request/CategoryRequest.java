package com.project.electronics.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequest {
    private Long id;
    @NotBlank(message = "Category name is required")
    @Size(max = 150, message = "Category name must be <= 150 chars")
    private String name;
}