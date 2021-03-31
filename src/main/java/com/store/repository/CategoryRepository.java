package com.store.repository;


import com.store.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByCategoryName(String categoryName);

    @Modifying
    @Transactional
    @Query("update Category c set c.categoryName = ?1 where c.categoryId = ?2")
    void updateCategory(String categoryName, Long categoryId);
}
