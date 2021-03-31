package com.store.repository;


import com.store.models.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional
public interface ProductImagesRepository extends JpaRepository<ProductImages, Long> {
    List<ProductImages> findAllByProductId(Long productId);
}
