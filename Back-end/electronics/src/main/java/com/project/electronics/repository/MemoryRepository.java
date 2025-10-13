package com.project.electronics.repository;

import com.project.electronics.models.MemoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoryRepository extends JpaRepository<MemoryEntity, Long> {
    boolean existsByNameIgnoreCase(String name);
}