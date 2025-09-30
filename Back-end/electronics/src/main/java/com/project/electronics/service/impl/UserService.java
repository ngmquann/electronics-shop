package com.project.electronics.service.impl;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.converter.UserConverter;
import com.project.electronics.customexceptions.DataNotFoundException;
import com.project.electronics.customexceptions.PermissionDenyException;
import com.project.electronics.dto.request.UserRequest;
import com.project.electronics.dto.response.LoginResponse;
import com.project.electronics.models.RoleEntity;
import com.project.electronics.models.UserEntity;
import com.project.electronics.repository.RoleRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.repository.httpclient.OutboundIdentityClient;
import com.project.electronics.repository.httpclient.OutboundUserClient;
import com.project.electronics.service.IEmailService;
import com.project.electronics.service.IUserService;
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

        RoleEntity role = roleRepository.findById(user.getRoleId())
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

        if (existingUser.getFacebookAccountId() == 0) {
            if (!passwordEncoder.matches(password, existingUser.getPassword())) {
                throw new BadCredentialsException("Wrong email or password");
            }
        }

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





}
