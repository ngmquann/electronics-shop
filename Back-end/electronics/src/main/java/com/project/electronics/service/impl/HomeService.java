package com.project.electronics.service.impl;

import com.project.electronics.dto.response.HeaderHomeResponse;
import com.project.electronics.models.UserEntity;
import com.project.electronics.repository.OrderDetailRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.repository.WishListRepository;
import com.project.electronics.service.IHomeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class HomeService  implements IHomeService {
    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;
    private final WishListRepository wishListRepository;
    @Override
    public HeaderHomeResponse getHeaderHome(Long id) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));

        int cartNumber = orderDetailRepository.countByUserAndStatusFalse(user);
        int favoriteNumber = wishListRepository.countByUser_Id(id);

        return HeaderHomeResponse.builder()
                .cartNumber(cartNumber)
                .favoriteNumber(favoriteNumber)
                .fullName(user.getFullName())
                .build();
    }
}
