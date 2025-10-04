package com.project.electronics.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String note;
    private String detail;
    private Long categoryId;
    private String categoryName;
    private List<AssociateResponse> associates;
    private List<MemoryResponse> memories;
    private List<ColorResponse> colors;
    private List<ImageResponse> imageData;
}
