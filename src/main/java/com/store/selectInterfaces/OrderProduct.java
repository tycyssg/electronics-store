package com.store.selectInterfaces;

import java.util.Date;

public interface OrderProduct {
    public Long getProductId();

    public Double getPrice();

    public Integer getStock();

    public Double getDiscountAmount();

    public Date getExpireDiscount();
}
