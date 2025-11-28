package com.project.electronics.service;



import com.project.electronics.dto.request.UserChangePassword;
import com.project.electronics.dto.request.UserProfileRequest;
import com.project.electronics.dto.request.UserRequest;
import com.project.electronics.dto.request.UserRequestAdmin;
import com.project.electronics.dto.response.LoginResponse;
import com.project.electronics.dto.response.UserResponse;
import com.project.electronics.models.UserEntity;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IUserService {
    UserEntity createUser(UserRequest user) throws Exception;
    LoginResponse login(String phoneNumber, String password) throws Exception;
    String addUserByAdmin(UserRequestAdmin userRequestAdmin) throws Exception;
    String setStatusUserByAdmin(Long userId) throws Exception;
    List<UserResponse> getAllUserResponses() ;
    UserResponse getUserResponses(HttpServletRequest rq) throws Exception;
    void deleteUserById(Long userId) throws Exception;
    String changePassword(Long userId, UserChangePassword request) throws Exception;
    String updateProfile(HttpServletRequest rq, UserProfileRequest request) throws Exception;
}
