package com.project.electronics.service.impl;

import com.project.electronics.components.JwtTokenUtil;
import com.project.electronics.dto.request.ChangeStatusRequest;
import com.project.electronics.dto.request.OrderRequest;
import com.project.electronics.dto.request.OrderRequestResponse;
import com.project.electronics.dto.response.OrderItemResponse;
import com.project.electronics.dto.response.OrderResponse;
import com.project.electronics.dto.response.UserBriefDto;
import com.project.electronics.models.*;
import com.project.electronics.repository.*;
import com.project.electronics.service.IOrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService implements IOrderService {
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final OrderRepository orderRepository;
    private final MemoryRepository memoryRepository;
    private final ColorRepository colorRepository;
    @Override
    public List<OrderResponse> getAllOrderResponseList() {
        List<OrderEntity> orders = orderRepository.findAllByStatus(true);
        if (orders.isEmpty()) return List.of();

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

        List<OrderResponse> result = new ArrayList<>();
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

        return result;
    }
    @Override
    public String addOrder(OrderRequestResponse orderRequest) {
        OrderEntity order = orderRepository.findByIdAndStatus(orderRequest.getOrderId(), false)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng trong giỏ."));
        List<OrderDetailEntity> orderDetailEntityList = order.getOrderDetails();
        for (OrderDetailEntity detail : orderDetailEntityList) {
            detail.setStatus(true);
        }
        order.setTotal(orderRequest.getTotal()/100);
        order.setMethodDelivery(orderRequest.getMethodDelivery());
        order.setMethodPayment(orderRequest.getMethodPayment());
        order.setStatus(true);
        order.setStatusMethodDelivery("PENDING");
        order.setAddress(orderRequest.getAddress());
        order.setOrderDetails(orderDetailEntityList);
        orderRepository.save(order);

        return "Order placed successfully";
    }

    @Override
    public String changeStatusDelivery(ChangeStatusRequest request) {

        OrderEntity order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng có ID: " + request.getOrderId()));

        order.setStatusMethodDelivery(request.getStatus());

        orderRepository.save(order);

        return "Order changed successfully";
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
