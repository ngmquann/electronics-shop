package com.project.electronics.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssociateRequest {
    private Long id;
    private String name;
    private String type;
    private String logo;
}
