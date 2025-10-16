package com.project.electronics.dto.response;


import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {
    private int userTotal;
    private int productTotal;
    private int orderTotal;
    private List<RevenueResponse> revenues;
    private List<OrderResponse> orderResponses;
}
