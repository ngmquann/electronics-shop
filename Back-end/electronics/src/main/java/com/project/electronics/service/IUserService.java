package com.project.electronics.service;



import com.project.electronics.dto.request.UserRequest;
import com.project.electronics.dto.request.UserRequestAdmin;
import com.project.electronics.dto.response.LoginResponse;
import com.project.electronics.dto.response.UserResponse;
import com.project.electronics.models.UserEntity;

import java.util.List;

public interface IUserService {
    UserEntity createUser(UserRequest user) throws Exception;
    LoginResponse login(String phoneNumber, String password) throws Exception;
    String addUserByAdmin(UserRequestAdmin userRequestAdmin) throws Exception;
    String setStatusUserByAdmin(Long userId) throws Exception;
    List<UserResponse> getAllUserResponses() ;
    void deleteUserById(Long userId) throws Exception;
}
