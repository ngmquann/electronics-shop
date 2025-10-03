package com.project.electronics.service.impl;

import com.project.electronics.models.ProductEntity;
import com.project.electronics.models.UserEntity;
import com.project.electronics.models.WishlistEntity;
import com.project.electronics.repository.ProductRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.repository.WishListRepository;
import com.project.electronics.service.IFavoriteService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class FavoriteService implements IFavoriteService {

    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public boolean toggleFavorite(Long productId, Long userId) {

        if (wishListRepository.existsByUser_IdAndProduct_Id(userId, productId)) {
            wishListRepository.deleteByUser_IdAndProduct_Id(userId, productId);
            return false;
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

        WishlistEntity wl = WishlistEntity.builder()
                .user(user)
                .product(product)
                .build();

        wishListRepository.save(wl);
        return true;
    }
}
