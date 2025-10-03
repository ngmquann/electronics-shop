package com.project.electronics.repository;


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
}
