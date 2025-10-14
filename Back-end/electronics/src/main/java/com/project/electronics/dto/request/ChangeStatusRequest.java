package com.project.electronics.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangeStatusRequest {
    private Long orderId;
    private String status; //  "SHIPPING", "DELIVERED", "CANCELLED"
}
