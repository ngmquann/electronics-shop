package com.project.electronics.repository;

import com.project.electronics.models.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findFirstByUserIdAndStatus(Long userId, Boolean status);
    List<OrderEntity> findAllByStatus(Boolean status);
}