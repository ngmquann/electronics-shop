package com.project.electronics.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageCreateRequest {
    @NotBlank(message = "Images are required")
    private String data;
}