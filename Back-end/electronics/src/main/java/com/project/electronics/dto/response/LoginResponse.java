package com.project.electronics.dto.response;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private boolean hasPassword;
    private boolean activation;
    private boolean firstLogin;
    private Long userId;
    private String fullName;
}