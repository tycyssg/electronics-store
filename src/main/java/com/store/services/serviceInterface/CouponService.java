package com.store.services.serviceInterface;


import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.InvalidDataFormatParameterizedException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Coupon;

import java.util.List;

public interface CouponService {
    Coupon addCoupon(Coupon coupon) throws ExistException, InvalidDataFormatException, InvalidDataFormatParameterizedException;

    List<Coupon> getAllCoupons();

    void deleteCoupon(Long couponId) throws NotExistException;

}
