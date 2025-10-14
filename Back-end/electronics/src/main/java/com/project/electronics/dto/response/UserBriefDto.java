package com.project.electronics.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserBriefDto {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String image;
}