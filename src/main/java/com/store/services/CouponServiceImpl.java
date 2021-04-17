package com.store.services;


import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatParameterizedException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Coupon;
import com.store.repository.CouponRepository;
import com.store.services.serviceInterface.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import static com.store.constants.ErrorConstants.*;

@Service
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;

    @Autowired
    public CouponServiceImpl(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    @Override
    public Coupon addCoupon(Coupon coupon) throws ExistException, InvalidDataFormatParameterizedException {

        if (couponRepository.existsByCouponCode(coupon.getCouponCode()))
            throw new ExistException(COUPON_EXITS);

        if (coupon.getValidTime().before(new Date()))
            throw new InvalidDataFormatParameterizedException(COUPON_DATE_INVALID);

        return couponRepository.save(coupon);
    }

    @Override
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    @Override
    public void deleteCoupon(Long couponId) throws NotExistException {
        if (!couponRepository.existsById(couponId))
            throw new NotExistException(COUPON_NOT_EXITS);

        couponRepository.deleteById(couponId);
    }

}
