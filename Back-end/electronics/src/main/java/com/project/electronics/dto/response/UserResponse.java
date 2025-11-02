package com.project.electronics.dto.response;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String fullName;
    private String createdAt;
    private boolean active;
    private String phoneNumber;
    private String address;
    private String email;
    private String image;
    private LocalDate dateOfBirth;
}
