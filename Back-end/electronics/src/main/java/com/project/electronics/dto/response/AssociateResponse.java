package com.project.electronics.dto.response;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssociateResponse {
    private Long id;
    private String name;
    private String type;
}
