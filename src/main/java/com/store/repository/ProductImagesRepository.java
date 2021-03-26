package com.store.repository;


import com.store.models.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductImagesRepository extends JpaRepository<ProductImages, Long> {

}
