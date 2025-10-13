package com.project.electronics.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemoryRequest {
    private Long id;
    @NotBlank(message = "Memory name is required")
    @Size(max = 150, message = "Memory name must be <= 150 chars")
    private String name;
    @NotNull
    private Double price;
}