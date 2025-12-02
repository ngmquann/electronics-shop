package com.project.electronics.service.impl;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.dto.response.HomeProductResponse;
import com.project.electronics.models.ProductEntity;
import com.project.electronics.models.UserEntity;
import com.project.electronics.models.WishlistEntity;
import com.project.electronics.repository.ProductRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.repository.WishListRepository;
import com.project.electronics.service.IFavoriteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class FavoriteService implements IFavoriteService {

    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final JwtTokenUtil jwtTokenUtil;

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

    @Override
    public List<HomeProductResponse> getAllFavoriteByUser(HttpServletRequest request) {
        UserEntity user = resolveUserFromRequest(request);
        List<WishlistEntity> wishlist = wishListRepository.findByUser_Id(user.getId());
        List<HomeProductResponse> favoriteProducts = wishlist.stream()
                .map(w -> {
                    ProductEntity p = w.getProduct();
                    String firstImage = p.getImages().isEmpty() ? null : p.getImages().get(0).getData();
                    Double price = null;
                    if (p.getMemories() != null && !p.getMemories().isEmpty()) {
                        price = p.getMemories().get(0).getPrice();
                    }
                    if (p.getColors() != null && !p.getColors().isEmpty()) {
                        price += p.getColors().get(0).getPrice();
                    }
                    boolean isFavorite = true;
                    return HomeProductResponse.builder()
                            .id(p.getId())
                            .name(p.getName())
                            .price(price)
                            .isFavorite(isFavorite)
                            .images(firstImage)
                            .build();
                })
                .toList();
        return favoriteProducts;
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
