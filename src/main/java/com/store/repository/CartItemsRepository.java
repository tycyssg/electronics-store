package com.store.repository;


import com.store.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface CartItemsRepository extends JpaRepository<CartItem, Long> {
    boolean existsByProductId(Long productId);

    void deleteAllByUserId(Long userId);

    @Modifying
    @Transactional
    @Query("update CartItem c set c.productQuantity = c.productQuantity + ?1 where c.cartItemId = ?2")
    void updateQuantityPlus(Integer productQuantity, Long cartItemId);

    @Modifying
    @Transactional
    @Query("update CartItem c set c.productQuantity = c.productQuantity - ?1 where c.cartItemId = ?2")
    void updateQuantityMinus(Integer productQuantity, Long cartItemId);


}
