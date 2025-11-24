package com.project.electronics.repository;

import com.project.electronics.models.OrderDetailEntity;
import com.project.electronics.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Long> {
    @Query("SELECT COUNT(od) FROM OrderDetailEntity od WHERE od.user = :user AND od.status = false")
    int countByUserAndStatusFalse(@Param("user") UserEntity user);
    List<OrderDetailEntity> findByUserAndStatusFalse(UserEntity user);
    Optional<OrderDetailEntity> findByIdAndUserIdAndStatusFalse(Long id, Long userId);
    Optional<OrderDetailEntity> findByOrderIdAndProductIdAndStatusFalse(Long orderId, Long productId);
    boolean existsByProductId(Long productId);
}
