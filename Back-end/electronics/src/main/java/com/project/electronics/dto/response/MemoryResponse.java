package com.project.electronics.dto.response;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemoryResponse {
    private Long id;
    private String name;
    private Double price;
}
