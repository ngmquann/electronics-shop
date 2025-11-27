package com.project.electronics.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileRequest {
    private String fullName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String image;
}

