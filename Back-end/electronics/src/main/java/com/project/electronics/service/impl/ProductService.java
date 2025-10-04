package com.project.electronics.service.impl;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.converter.CategoryConverter;
import com.project.electronics.converter.ProductConverter;
import com.project.electronics.dto.request.ProductCreateRequest;
import com.project.electronics.dto.response.*;
import com.project.electronics.models.*;
import com.project.electronics.repository.*;
import com.project.electronics.service.IProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final CategoryRepository categoryRepository;
    private final ProductConverter productConverter;
    private final AssociateRepository associateRepository;
    private final MemoryRepository memoryRepository;
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

    @Override
    public List<HomeProductResponse> getAllByCategory(Long categoryId, HttpServletRequest request) {
        CategoryEntity categoryRef = categoryRepository.getReferenceById(categoryId);
        UserEntity user = resolveUserFromRequest(request);
        return productRepository.findAllByCategory(categoryRef)
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
    public String create(ProductCreateRequest req) {
        CategoryEntity category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + req.getCategoryId()));

        List<AssociateEntity> associates = (req.getAssociateIds() == null || req.getAssociateIds().isEmpty())
                ? new ArrayList<>()
                : associateRepository.findAllById(req.getAssociateIds());

        List<MemoryEntity> memories = (req.getMemoryIds() == null || req.getMemoryIds().isEmpty())
                ? new ArrayList<>()
                : memoryRepository.findAllById(req.getMemoryIds());

        ProductEntity product = ProductEntity.builder()
                .name(req.getName())
                .note(req.getNote())
                .detail(req.getDetail())
                .category(category)
                .associates(associates)
                .memories(memories)
                .build();

        if (req.getImages() != null && !req.getImages().isEmpty()) {
            List<ImageEntity> images = req.getImages().stream()
                    .map(img -> ImageEntity.builder()
                            .data(img.getData())
                            .product(product)
                            .build())
                    .toList();
            product.setImages(images);
        } else {
            product.setImages(new ArrayList<>());
        }
        if (req.getColorCreateRequest() != null && !req.getColorCreateRequest().isEmpty()) {
            List<ColorEntity> colors = req.getColorCreateRequest().stream()
                    .map(col -> ColorEntity.builder()
                            .product(product)
                            .price(col.getPrice())
                            .name(col.getName())
                            .build())
                    .toList();
            product.setColors(colors);
        } else {
            product.setColors(new ArrayList<>());
        }

        productRepository.save(product);

        return "Thêm sản phẩm thành công";
    }

    @Override
    public ProductResponse getProductById(Long id) {
        ProductEntity p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        return ProductResponse.builder()
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
                .build();

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
