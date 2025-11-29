package com.project.electronics.service.impl;

import com.project.electronics.dto.response.*;
import com.project.electronics.models.*;
import com.project.electronics.repository.*;
import com.project.electronics.service.IDashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;



@RequiredArgsConstructor
@Slf4j
@Service
public class DashboardService implements IDashboardService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final MemoryRepository memoryRepository;
    private final ColorRepository colorRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public DashboardResponse getDashboard() {
        int userTotal = (int) userRepository.count();
        int productTotal = (int) productRepository.count();
        int orderTotal = (int) orderRepository.count();

        List<OrderEntity> allOrders = orderRepository.findAll();
        List<RevenueResponse> revenues = allOrders.stream()
                .map(o -> RevenueResponse.builder()
                        .total(o.getTotal())
                        .date(o.getCreatedAt())
                        .build())
                .toList();

        List<OrderEntity> orders = orderRepository.findOrderLatest();

        List<OrderResponse> result = new ArrayList<>();
        if (!orders.isEmpty()){
            Set<Long> memoryIds = new HashSet<>();
            Set<Long> colorIds  = new HashSet<>();
            for (OrderEntity o : orders) {
                for (OrderDetailEntity d : o.getOrderDetails()) {
                    if (d.getMemoryId() != null) memoryIds.add(d.getMemoryId());
                    if (d.getColorId()  != null) colorIds.add(d.getColorId());
                }
            }

            Map<Long, MemoryEntity> memoryMap = memoryIds.isEmpty()
                    ? Map.of()
                    : memoryRepository.findAllById(memoryIds)
                    .stream().collect(Collectors.toMap(MemoryEntity::getId, m -> m));
            Map<Long, ColorEntity> colorMap = colorIds.isEmpty()
                    ? Map.of()
                    : colorRepository.findAllById(colorIds)
                    .stream().collect(Collectors.toMap(ColorEntity::getId, c -> c));

            for (OrderEntity order : orders) {
                OrderResponse resp = new OrderResponse();
                resp.setId(order.getId());
                resp.setAddress(order.getAddress());
                resp.setTotal(order.getTotal());
                resp.setMethodDelivery(order.getMethodDelivery());
                resp.setMethodPayment(order.getMethodPayment());
                resp.setStatusMethodDelivery(order.getStatusMethodDelivery());
                resp.setCreatedAt(order.getCreatedAt());
                resp.setUpdatedAt(order.getUpdatedAt());

                UserEntity u = order.getUser();
                if (u != null) {
                    resp.setUser(UserBriefDto.builder()
                            .id(u.getId())
                            .fullName(u.getFullName())
                            .phoneNumber(u.getPhoneNumber())
                            .email(u.getEmail())
                            .image(u.getImage())
                            .build());
                }

                List<OrderItemResponse> itemDtos = new ArrayList<>();
                for (OrderDetailEntity d : order.getOrderDetails()) {
                    OrderItemResponse it = new OrderItemResponse();
                    it.setId(d.getId());
                    it.setQuantity(d.getQuantity());

                    if (d.getProduct() != null) {
                        it.setProductName(d.getProduct().getName());
                    }

                    if (d.getMemoryId() != null) {
                        MemoryEntity mem = memoryMap.get(d.getMemoryId());
                        if (mem != null) {
                            it.setMemoryName(mem.getName());
                            it.setMemoryPrice(mem.getPrice());
                        }
                    }

                    if (d.getColorId() != null) {
                        ColorEntity col = colorMap.get(d.getColorId());
                        if (col != null) {
                            it.setColorName(col.getName());
                            it.setColorPrice(col.getPrice());
                        }
                    }

                    itemDtos.add(it);
                }
                resp.setItems(itemDtos);

                result.add(resp);
            }
        }else{
            result = List.of();
        }

        return DashboardResponse.builder()
                .userTotal(userTotal)
                .productTotal(productTotal)
                .orderTotal(orderTotal)
                .revenues(revenues)
                .orderResponses(result)
                .categoryRates(calculateCategoryRates())
                .build();
    }
    public List<CategoryRateResponse> calculateCategoryRates() {
        List<CategoryEntity> categories = categoryRepository.findAll();

        int totalProducts = categories.stream()
                .mapToInt(c -> c.getProducts().size())
                .sum();

        if (totalProducts == 0) {
            return categories.stream()
                    .map(c -> new CategoryRateResponse(
                            c.getName(),
                            0
                    ))
                    .collect(Collectors.toList());
        }

        return categories.stream()
                .map(c -> {
                    int count = c.getProducts().size();
                    int percent = (int) Math.round((count * 100.0) / totalProducts);
                    return new CategoryRateResponse(
                            c.getName(),
                            percent
                    );
                })
                .collect(Collectors.toList());
    }

    private Date parseDate(String createdAt) {
        if (createdAt == null || createdAt.isBlank()) return null;
        try {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            LocalDate ld = LocalDate.parse(createdAt, fmt);
            return Date.from(ld.atStartOfDay(ZoneId.systemDefault()).toInstant());
        } catch (Exception ex) {
            log.warn("Cannot parse createdAt='{}': {}", createdAt, ex.getMessage());
            return null;
        }
    }
}
