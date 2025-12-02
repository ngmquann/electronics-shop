package com.project.electronics.repository;


import com.project.electronics.models.CategoryEntity;
import com.project.electronics.models.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    @Query(value = "SELECT * FROM products ORDER BY RAND() LIMIT :number", nativeQuery = true)
    List<ProductEntity> findRandomProducts(@Param("number") int number);
    List<ProductEntity> findTop5ByNameContainingIgnoreCaseOrderByNameAsc(String name);
    List<ProductEntity> findAllByCategory(CategoryEntity category);
    List<ProductEntity> findTop20ByNameContainingIgnoreCase(String name);
    List<ProductEntity> findByNameContainingIgnoreCase(String keyword);
}
