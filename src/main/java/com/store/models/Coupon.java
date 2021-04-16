package com.store.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "COUPONS")
public class Coupon implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long couponId;
    @NotNull
    private String couponCode;
    @NotNull
    private Double discountPercentage;
    @NotNull
    private Date validTime;

}
