package com.project.electronics.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private Double total;
    private String methodPayment;
    private String methodDelivery;
    private String address;
}
