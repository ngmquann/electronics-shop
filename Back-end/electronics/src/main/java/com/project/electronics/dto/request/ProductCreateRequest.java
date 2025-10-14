package com.project.electronics.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCreateRequest {
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Note is required")
    private String note;
    @NotBlank(message = "Detail is required")
    private String detail;
    @NotNull
    private Long categoryId;
    private List<Long> associateIds;
    private List<Long> memoryIds;
    private List<ImageCreateRequest> images;
    private List<ColorCreateRequest>  colorCreateRequest;
}