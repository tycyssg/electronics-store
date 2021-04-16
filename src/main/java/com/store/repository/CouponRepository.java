package com.store.repository;


import com.store.models.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    boolean existsByCouponCode(String couponCode);

}
