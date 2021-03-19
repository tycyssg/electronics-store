package com.store.repository;


import com.store.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    @Modifying
    @Transactional
    @Query("select p from Product p where p.title like CONCAT('%', ?1, '%') ")
    List<Product> searchProduct(String productTitle);
}
