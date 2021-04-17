package com.store.controllers;

import com.store.exceptions.ExceptionHandling;
import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.InvalidDataFormatParameterizedException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Coupon;
import com.store.services.serviceInterface.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api")
public class CouponController extends ExceptionHandling {

    private final CouponService couponService;

    @Autowired
    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }


    @PostMapping("/addCoupon")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<Coupon> addCoupon(@Valid @RequestBody Coupon coupon, BindingResult bindingResult) throws InvalidDataFormatException, ExistException, InvalidDataFormatParameterizedException {
        if (bindingResult.hasErrors())
            throw new InvalidDataFormatException();

        return new ResponseEntity<>(couponService.addCoupon(coupon), HttpStatus.OK);
    }

    @DeleteMapping("/deleteCoupon/{couponId}")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<Long> deleteCoupon(@PathVariable("couponId") Long couponId) throws NotExistException {
        couponService.deleteCoupon(couponId);

        return new ResponseEntity<>(couponId, HttpStatus.OK);
    }


    @GetMapping("/getCoupons")
    @ResponseBody
    public ResponseEntity<List<Coupon>> getCoupons() {
        return new ResponseEntity<>(couponService.getAllCoupons(), HttpStatus.OK);
    }

}
