package com.project.electronics.service.impl;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.dto.request.CartChangeRequest;
import com.project.electronics.dto.request.CartRequest;
import com.project.electronics.dto.response.*;
import com.project.electronics.models.OrderDetailEntity;
import com.project.electronics.models.OrderEntity;
import com.project.electronics.models.ProductEntity;
import com.project.electronics.models.UserEntity;
import com.project.electronics.repository.OrderDetailRepository;
import com.project.electronics.repository.OrderRepository;
import com.project.electronics.repository.ProductRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.service.ICartService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService implements ICartService {

    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

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

    @Override
    public boolean changeQuantity(CartChangeRequest cartChangeRequest, Long userId) {
        Integer qty = cartChangeRequest.getQuantity();
        if (qty == null || qty <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        OrderDetailEntity orderDetail = orderDetailRepository
                .findByIdAndUserIdAndStatusFalse(cartChangeRequest.getId(), userId)
                .orElseThrow(() -> new RuntimeException("Cart item not found for this user or already checked out"));

        orderDetail.setQuantity(qty);
        orderDetailRepository.save(orderDetail);
        return true;
    }

    @Override
    public boolean addCart(CartRequest cartRequest, HttpServletRequest httpServletRequest) {
        UserEntity user = resolveUserFromRequest(httpServletRequest);

        ProductEntity product = productRepository.findById(cartRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found: " + cartRequest.getProductId()));

        OrderEntity cart = orderRepository.findFirstByUserIdAndStatus(user.getId(), false)
                .orElseGet(() -> orderRepository.save(
                        OrderEntity.builder()
                                .user(user)
                                .status(false)
                                .methodDelivery("NONE")
                                .statusMethodDelivery("PENDING")
                                .total(0.0)
                                .build()
                ));

        Optional<OrderDetailEntity> existedOpt =
                orderDetailRepository.findByOrderIdAndProductIdAndStatusFalse(cart.getId(), product.getId());

        if (existedOpt.isPresent()) {
            OrderDetailEntity existed = existedOpt.get();
            existed.setQuantity(existed.getQuantity() + cartRequest.getQuantity());
            orderDetailRepository.save(existed);
        } else {
            int qty = (cartRequest.getQuantity() != null && cartRequest.getQuantity() > 0)
                    ? cartRequest.getQuantity() : 1;

            OrderDetailEntity orderDetailEntity = OrderDetailEntity.builder()
                    .status(false)
                    .user(user)
                    .product(product)
                    .memoryId(cartRequest.getMemoryId())
                    .colorId(cartRequest.getColorId())
                    .quantity(qty)
                    .order(cart)
                    .build();

            orderDetailRepository.save(orderDetailEntity);
        }

        return true;
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
