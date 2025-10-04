package com.project.electronics.service.impl;

import com.project.electronics.dto.response.*;
import com.project.electronics.models.OrderDetailEntity;
import com.project.electronics.models.UserEntity;
import com.project.electronics.repository.OrderDetailRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.service.ICartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService implements ICartService {

    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;

    @Override
    public List<CartResponse> getCartByUserId(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        List<OrderDetailEntity> orderDetailEntityList = orderDetailRepository.findByUserAndStatusFalse(user);

        List<CartResponse> cartResponseList = new ArrayList<>(orderDetailEntityList.size());

        for (OrderDetailEntity od : orderDetailEntityList) {
            var p = od.getProduct();
            CartResponse cartResponse = new CartResponse();
            cartResponse.setId(od.getId());
            cartResponse.setQuantity(od.getQuantity());
            cartResponse.setProduct(
                    ProductResponse.builder()
                            .id(p.getId())
                            .name(p.getName())
                            .note(p.getNote())
                            .detail(p.getDetail())
                            .categoryId(p.getCategory().getId())
                            .categoryName(p.getCategory().getName())
                            .associates(
                                    p.getAssociates().stream()
                                            .map(a -> AssociateResponse.builder()
                                                    .id(a.getId())
                                                    .name(a.getName())
                                                    .build())
                                            .toList()
                            )
                            .memories(
                                    p.getMemories().stream()
                                            .map(m -> MemoryResponse.builder()
                                                    .id(m.getId())
                                                    .name(m.getName())
                                                    .build())
                                            .toList()
                            )
                            .colors(
                                    p.getColors().stream()
                                            .map(c -> ColorResponse.builder()
                                                    .id(c.getId())
                                                    .name(c.getName())
                                                    .price(c.getPrice())
                                                    .build())
                                            .toList()
                            )
                            .imageData(
                                    p.getImages().stream()
                                            .map(i -> ImageResponse.builder()
                                                    .id(i.getId())
                                                    .data(i.getData())
                                                    .build())
                                            .toList()
                            )
                            .build()
            );

            cartResponseList.add(cartResponse);
        }

        return cartResponseList;
    }
}
