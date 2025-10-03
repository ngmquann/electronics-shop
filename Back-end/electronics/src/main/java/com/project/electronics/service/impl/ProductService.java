package com.project.electronics.service.impl;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.dto.response.HomeProductResponse;
import com.project.electronics.dto.response.ProductSearchResponse;
import com.project.electronics.models.UserEntity;
import com.project.electronics.repository.ProductRepository;
import com.project.electronics.repository.UserRepository;
import com.project.electronics.repository.WishListRepository;
import com.project.electronics.service.IProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final WishListRepository wishListRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    @Transactional(readOnly = true)
    public List<HomeProductResponse> getRanDomHome(int number, HttpServletRequest request) {
        UserEntity user = resolveUserFromRequest(request);
        return productRepository.findRandomProducts(number)
                .stream()
                .map(product -> HomeProductResponse.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .note(product.getNote())
                        .images(
                                product.getImages() != null && !product.getImages().isEmpty()
                                        ? product.getImages().get(0).getData()
                                        : null
                        )
                        .isFavorite(
                                user != null && wishListRepository.existsByUser_IdAndProduct_Id(user.getId(), product.getId())
                        )
                        .build()
                )
                .toList();
    }

    @Override
    public List<ProductSearchResponse> searchByName(String name) {
        return productRepository.findTop5ByNameContainingIgnoreCaseOrderByNameAsc(name)
                .stream()
                .map(p -> ProductSearchResponse.builder()
                        .id(p.getId())
                        .name(p.getName())
                        .images(!p.getImages().isEmpty() ? p.getImages().get(0).getData() : null)
                        .build())
                .toList();
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
