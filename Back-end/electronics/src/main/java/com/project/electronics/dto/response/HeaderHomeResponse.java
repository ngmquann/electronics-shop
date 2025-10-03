package com.project.electronics.dto.response;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HeaderHomeResponse {
    private String fullName;
    private int cartNumber;
    private int favoriteNumber;
}
