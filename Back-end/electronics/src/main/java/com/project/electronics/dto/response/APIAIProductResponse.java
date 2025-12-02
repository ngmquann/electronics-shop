package com.project.electronics.dto.response;


import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class APIAIProductResponse {
    private int code;
    private String message;
    private String type;
    private List<AIProductResponse> aiProductResponse;
}
