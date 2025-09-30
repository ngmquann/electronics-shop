package com.project.electronics.service;



import com.project.electronics.dto.request.UserRequest;
import com.project.electronics.dto.response.LoginResponse;
import com.project.electronics.models.UserEntity;

public interface IUserService {
    UserEntity createUser(UserRequest user) throws Exception;
    LoginResponse login(String phoneNumber, String password) throws Exception;
}
