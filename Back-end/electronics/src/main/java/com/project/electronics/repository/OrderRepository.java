package com.project.electronics.repository;

import com.project.electronics.models.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findFirstByUserIdAndStatus(Long userId, Boolean status);
    List<OrderEntity> findAllByStatus(Boolean status);
    @Query("SELECT o FROM OrderEntity o ORDER BY o.createdAt DESC")
    List<OrderEntity> findOrderLatest();
    Optional<OrderEntity> findByIdAndStatus(Long id, Boolean status);
    List<OrderEntity> findAllByUserIdAndStatus(Long userId, Boolean status);

}