package com.project.electronics.controller;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.dto.ApiError;
import com.project.electronics.dto.request.UserLogin;
import com.project.electronics.dto.request.UserRequest;
import com.project.electronics.dto.response.LoginResponse;
import com.project.electronics.models.UserEntity;
import com.project.electronics.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private IUserService userService;
//    @PostMapping("/outbound/authentication")
//    ResponseEntity<?> outboundAuthentication(@RequestParam("code") String code) {
//        try {
//            LoginResponse result = userService.outboundAuthenticate(code);
//
//            return ResponseEntity.ok(result);
//        }catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//    @PostMapping("/create-password")
//    ResponseEntity<?> createPassword(@RequestBody @Valid PasswordCreationRequest request,  BindingResult result) {
//        if(result.hasErrors()){
//            List<String> errorMessages = result.getFieldErrors()
//                    .stream()
//                    .map(FieldError::getDefaultMessage)
//                    .collect(Collectors.toList());
//            return ResponseEntity.badRequest().body(errorMessages);
//        }
//        userService.updatePassword(request);
//        return ResponseEntity.ok("Password updated");
//    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody UserRequest userRequest,
            BindingResult result
    ) throws Exception {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }

        if (!userRequest.getPassword().equals(userRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Password not match");
        }

        UserEntity userEntity = userService.createUser(userRequest);

        return ResponseEntity.ok(Map.of("id", userEntity.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody UserLogin userLogin,
            BindingResult result) throws Exception {

        if (result.hasErrors()) {
            String errorMsg = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            ApiError error = ApiError.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .error("VALIDATION_ERROR")
                    .message(errorMsg)
                    .timestamp(LocalDateTime.now())
                    .build();
            return ResponseEntity.badRequest().body(error);
        }

        LoginResponse data = userService.login(userLogin.getEmail(), userLogin.getPassword());
        return ResponseEntity.ok(data);
    }




}
