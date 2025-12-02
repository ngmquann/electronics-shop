package com.project.electronics.repository;

import com.project.electronics.models.WishlistEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface WishListRepository extends JpaRepository<WishlistEntity, Long> {

    boolean existsByUser_IdAndProduct_Id(Long userId, Long productId);

    @Transactional
    void deleteByUser_IdAndProduct_Id(Long userId, Long productId);
    int countByUser_Id(Long userId);
    List<WishlistEntity> findByUser_Id(Long userId);
}
