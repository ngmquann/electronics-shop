package com.project.electronics.repository;

import com.project.electronics.models.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    boolean existsByNameIgnoreCase(String name);
    Optional<CategoryEntity> findByNameIgnoreCase(String name);
    List<CategoryEntity> findTop20ByNameContainingIgnoreCase(String name);
}

