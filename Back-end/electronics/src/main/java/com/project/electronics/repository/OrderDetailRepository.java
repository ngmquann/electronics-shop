package com.project.electronics.repository;

import com.project.electronics.models.OrderDetailEntity;
import com.project.electronics.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Long> {
    @Query("SELECT COUNT(od) FROM OrderDetailEntity od WHERE od.user = :user AND od.status = false")
    int countByUserAndStatusFalse(@Param("user") UserEntity user);
}
