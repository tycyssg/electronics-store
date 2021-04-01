package com.store.repository;


import com.store.models.Product;
import com.store.selectInterfaces.UpdatedRating;
import com.store.selectInterfaces.UpdatedStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {

    UpdatedRating findUpdatedRatingByProductId(Long productId);

    UpdatedStock findUpdatedStockByProductId(Long productId);

    @Modifying
    @Transactional
    @Query("select p from Product p where p.title like CONCAT('%', ?1, '%') ")
    List<Product> searchProduct(String productTitle);

    @Modifying
    @Transactional
    @Query("update Product p set p.stock = ?1 where p.productId = ?2")
    void updateProductStock(Integer stock, Long productId);

    @Modifying
    @Transactional
    @Query("update Product p set p.stock = p.stock - ?1 where p.productId = ?2")
    void updateProductStockOnBuy(Integer quantity, Long productId);

    @Modifying
    @Transactional
    @Query("update Product p set p.numOfRatingCustomers = p.numOfRatingCustomers + ?1, p.totalRating = p.totalRating + ?2 where p.productId = ?3")
    void updateRating(Integer numberOfCustomers, Integer customerRating, Long productId);

    @Modifying
    @Transactional
    @Query("update Product p set p.title = ?1,p.manufactured = ?2,p.description = ?3,p.price = ?4,p.stock = ?5,p.discountAmount = ?6 ,p.expireDiscount = ?7,p.warranty = ?8  where p.productId = ?9")
    void updateProduct(String title, String manufactured, String description, Double price, Integer stock, Double discountAmount, Date expireDiscount, Integer warranty, Long productId);
}
