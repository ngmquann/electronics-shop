package com.project.electronics.repository;

import com.project.electronics.models.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

}

