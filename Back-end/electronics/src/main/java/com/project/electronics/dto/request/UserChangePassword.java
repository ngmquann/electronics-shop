package com.project.electronics.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserChangePassword {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}