package com.project.electronics.service.impl;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.converter.UserConverter;
import com.project.electronics.customexceptions.DataNotFoundException;
import com.project.electronics.customexceptions.PermissionDenyException;
import com.project.electronics.dto.request.UserChangePassword;
import com.project.electronics.dto.request.UserProfileRequest;
import com.project.electronics.dto.request.UserRequest;
import com.project.electronics.dto.request.UserRequestAdmin;
import com.project.electronics.dto.response.LoginResponse;
import com.project.electronics.dto.response.UserResponse;
import com.project.electronics.models.RoleEntity;
import com.project.electronics.models.UserEntity;
import com.project.electronics.repository.RoleRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.repository.httpclient.OutboundIdentityClient;
import com.project.electronics.repository.httpclient.OutboundUserClient;
import com.project.electronics.service.IEmailService;
import com.project.electronics.service.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;
    private final OutboundIdentityClient outboundIdentityClient;
    private final OutboundUserClient outboundUserClient;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private IEmailService emailService;
    @NonFinal
    @Value("${outbound.identity.client-id}")
    protected  String CLIENT_ID ;
    @NonFinal
    @Value("${outbound.identity.client-secret}")
    protected  String CLIENT_SECRET;
    @NonFinal
    @Value("${outbound.identity.redirect-uri}")
    protected  String REDIRECT_URI ;
    @NonFinal
    protected final String GRANT_TYPE = "authorization_code";
    @Override
    public UserEntity createUser(UserRequest user) throws PermissionDenyException {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DataNotFoundException("Email already exists");
        }

        RoleEntity role = roleRepository.findById(2L)
                .orElseThrow(() -> new DataNotFoundException("Role not found"));

        if ("ADMIN".equalsIgnoreCase(role.getName())) {
            throw new PermissionDenyException("Admin role cannot be created");
        }

        String encryptedPassword = passwordEncoder.encode(user.getPassword());

        UserEntity newUser = UserEntity.builder()
                .email(user.getEmail())
                .password(encryptedPassword)
                .roleEntity(role)
                .activationCode(generateActivationCode())
                .fullName(user.getFullName())
                .build();

        userRepository.save(newUser);

        emailService.sendMessage(
                "no-reply@studyenglish.com",
                newUser.getEmail(),
                "Activate your account",
                "Mã kích hoạt của bạn là: " + newUser.getActivationCode()
        );

        return newUser;
    }

    private int generateActivationCode() {
        Random random = new Random();
        return 1000 + random.nextInt(9000);
    }


    @Override
    public LoginResponse login(String email, String password) throws Exception {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Invalid email / password"));



        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        email, password, existingUser.getAuthorities()
                );
        authenticationManager.authenticate(authenticationToken);

        return LoginResponse.builder()
                .userId(existingUser.getId())
                .fullName(existingUser.getFullName())
                .token(jwtTokenUtil.generateToken(existingUser))
                .activation(existingUser.isActive())
                .hasPassword(StringUtils.hasText(existingUser.getPassword()))
                .firstLogin(!existingUser.isActive() || !StringUtils.hasText(existingUser.getPassword()))
                .build();
    }

    @Override
    public String addUserByAdmin(UserRequestAdmin userRequest) throws Exception {
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new DataNotFoundException("Email already exists");
        }

        RoleEntity role = roleRepository.findById(2L)
                .orElseThrow(() -> new DataNotFoundException("Role not found"));

        if ("ADMIN".equalsIgnoreCase(role.getName())) {
            throw new PermissionDenyException("Admin role cannot be created");
        }

        String encryptedPassword = passwordEncoder.encode(userRequest.getPassword());

        UserEntity newUser = UserEntity.builder()
                .email(userRequest.getEmail())
                .password(encryptedPassword)
                .dateOfBirth(userRequest.getDateOfBirth())
                .phoneNumber(userRequest.getPhoneNumber())
                .address(userRequest.getAddress())
                .roleEntity(role)
                .activationCode(generateActivationCode())
                .fullName(userRequest.getFullName())
                .active(true)
                .build();

        userRepository.save(newUser);


        return "User created by admin" ;
    }

    @Override
    public String setStatusUserByAdmin(Long userId) throws Exception {
        UserEntity existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        existingUser.setActive(!existingUser.isActive());
        userRepository.save(existingUser);
        return "User status is changed by admin";
    }

    @Override
    public List<UserResponse> getAllUserResponses() {
        return userRepository.findAllByRoleEntity_Id(2L)
                .stream()
                .map(entity -> userConverter.toUserResponse(entity))
                .toList();
    }

    @Transactional
    @Override
    public void deleteUserById(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found with id: " + userId));
        userRepository.delete(user);
    }

    @Override
    public String changePassword(Long userId, UserChangePassword request) throws Exception {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new Exception("Mật khẩu mới và xác nhận mật khẩu không trùng khớp");
        }

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new Exception("Có vẻ như mật khẩu cũ không khớp");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Đổi mật khẩu thành công!";
    }

    @Override
    public String updateProfile(HttpServletRequest rq, UserProfileRequest request) throws Exception {
        UserEntity user = resolveUserFromRequest(rq);
        if(user == null) {
            throw new Exception("User not found");
        }
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setAddress(request.getAddress());
        user.setImage(request.getImage());

        userRepository.save(user);

        return "Cập nhật thông tin thành công";
    }

    private UserEntity resolveUserFromRequest(HttpServletRequest request) {
        try {
            String headerAuth = request.getHeader("Authorization");
            if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
                return null;
            }
            String token = headerAuth.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return null;
            }
            Long userId = jwtTokenUtil.extractUserId(token);
            if (userId == null) return null;
            return userRepository.findById(userId).orElse(null);
        } catch (Exception ex) {
            log.warn("resolveUserFromRequest failed: {}", ex.getMessage());
            return null;
        }
    }

}
