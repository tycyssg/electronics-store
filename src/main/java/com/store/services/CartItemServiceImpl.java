package com.store.services;


import com.fasterxml.jackson.databind.JsonNode;
import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatParameterizedException;
import com.store.exceptions.model.NotExistException;
import com.store.models.CartItem;
import com.store.models.Coupon;
import com.store.models.OrderDetails;
import com.store.repository.*;
import com.store.selectInterfaces.OrderProduct;
import com.store.selectInterfaces.UserDetails;
import com.store.services.serviceInterface.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.store.constants.ErrorConstants.*;
import static com.store.constants.UserImplConstant.NO_USER_FOUND_BY_USERNAME;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final UserRepository userRepository;
    private final CartItemsRepository cartItemsRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final CouponRepository couponRepository;

    @Autowired
    public CartItemServiceImpl(UserRepository userRepository, CartItemsRepository cartItemsRepository, ProductRepository productRepository, OrderRepository orderRepository, CouponRepository couponRepository) {
        this.userRepository = userRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.couponRepository = couponRepository;
    }

    @Override
    public CartItem addCartItem(CartItem cartItem) throws NotExistException, ExistException {

        if (cartItem.getUserId() == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        UserDetails user = userRepository.findUserDetailsByUserId(cartItem.getUserId().toString()).orElse(null);

        if (user == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        if (!productRepository.existsById(cartItem.getProductId()))
            throw new NotExistException(PRODUCT_NOT_EXIST);

        if (cartItemsRepository.existsByProductId(cartItem.getProductId()))
            throw new ExistException(ITEM_EXIST_IN_CART);


        cartItem.setProductQuantity(1);
        cartItem.setUserId(user.getId());
        return cartItemsRepository.save(cartItem);
    }

    @Override
    public void deleteCartItem(Long cartItemId) throws NotExistException {
        if (!cartItemsRepository.existsById(cartItemId))
            throw new NotExistException(ITEM_NOT_EXIST_IN_CART);

        cartItemsRepository.deleteById(cartItemId);
    }

    @Override
    public void updateCartItemQuantityPlus(Long cartItemId) throws NotExistException {
        if (!cartItemsRepository.existsById(cartItemId))
            throw new NotExistException(ITEM_NOT_EXIST_IN_CART);

        this.cartItemsRepository.updateQuantityPlus(1, cartItemId);
    }

    @Override
    public void updateCartItemQuantityMinus(Long cartItemId) throws NotExistException {
        if (!cartItemsRepository.existsById(cartItemId))
            throw new NotExistException(ITEM_NOT_EXIST_IN_CART);

        this.cartItemsRepository.updateQuantityMinus(1, cartItemId);
    }

    @Override
    public OrderDetails makePayment(OrderDetails orderDetails) throws ExistException, NotExistException, InvalidDataFormatParameterizedException {
        if (orderDetails.getUserId() == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        UserDetails user = userRepository.findUserDetailsByUserId(orderDetails.getUserId().toString()).orElse(null);

        if (user == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        Map<Long, Integer> productMap = deserializeProductJson(orderDetails.getProducts());

        if (productMap.isEmpty())
            throw new NotExistException(CART_EMPTY);

        List<OrderProduct> dbProducts = extractCartProductsFromDb(productMap);


        Double couponDiscount = 0.0;
        if (!orderDetails.getCoupon().isEmpty()) {
            JsonNode coupon = orderDetails.getCoupon();
            Long couponId = Long.valueOf(coupon.get("couponId").toString());
            Coupon dbCoupon = couponRepository.findById(couponId).orElse(null);

            if (dbCoupon == null)
                throw new NotExistException(COUPON_NOT_EXITS);

            if (dbCoupon.getValidTime().before(new Date()))
                throw new NotExistException(COUPON_EXPIRED);

            if (!dbCoupon.getCouponCode().equals(coupon.get("couponCode").textValue()))
                throw new InvalidDataFormatParameterizedException(COUPON_ALTERED);

            if (!dbCoupon.getDiscountPercentage().equals(coupon.get("discountPercentage").doubleValue()))
                throw new InvalidDataFormatParameterizedException(COUPON_ALTERED);

            couponDiscount = dbCoupon.getDiscountPercentage();
        }

        boolean stockIsCorrect = checkIfStockIsCorrect(dbProducts, productMap);
        boolean correctPrice = checkTotalPrice(dbProducts, productMap, orderDetails.getOrderTotal(), couponDiscount);

        if (stockIsCorrect && correctPrice) {
            reduceTheStock(productMap);
            clearTheCart(user.getId());
        } else {
            throw new InvalidDataFormatParameterizedException(ORDER_NOT_COMPLETE);
        }

        orderDetails.setUserId(user.getId());
        return orderRepository.save(orderDetails);
    }

    private Map<Long, Integer> deserializeProductJson(JsonNode product) {
        Map<Long, Integer> productMap = new HashMap<>();
        for (int i = 0; i < product.size(); i++) {
            productMap.put(
                    Long.valueOf(product.get(i).get("productId").toString()),
                    Integer.valueOf(product.get(i).get("quantity").toString())
            );
        }
        return productMap;
    }

    private List<OrderProduct> extractCartProductsFromDb(Map<Long, Integer> productMap) {
        List<OrderProduct> products = new ArrayList<>();
        productMap.forEach((k, v) -> {
            products.add(productRepository.findOrderProductByProductId(k));
        });
        return products;
    }

    private boolean checkIfStockIsCorrect(List<OrderProduct> dbProducts, Map<Long, Integer> productMap) throws InvalidDataFormatParameterizedException {
        for (OrderProduct o : dbProducts) {
            Integer cartQuantity = productMap.get(o.getProductId());
            if (cartQuantity == null)
                throw new InvalidDataFormatParameterizedException(INVALID_PRODUCT_QUANTITY);

            if (o.getStock() - cartQuantity < 0)
                throw new InvalidDataFormatParameterizedException(LOW_STOCK);
        }

        return true;
    }

    private boolean checkTotalPrice(List<OrderProduct> dbProducts, Map<Long, Integer> productMap, Double totalPrice, Double couponDiscount) {
        Double calculatedTotal = 0.0;
        for (OrderProduct o : dbProducts) {
            Integer productQuantity = productMap.get(o.getProductId());
            if (o.getExpireDiscount() == null || o.getExpireDiscount().before(new Date())) {
                double result = (o.getPrice() * productQuantity);
                calculatedTotal += result;
            } else {
                double result = ((o.getPrice() - (o.getPrice() * o.getDiscountAmount()) / 100) * productQuantity);
                calculatedTotal += result;
            }
        }

        if (couponDiscount > 0) {
            calculatedTotal = (calculatedTotal - (calculatedTotal * couponDiscount) / 100);
        }

        return calculatedTotal.equals(totalPrice);
    }

    private void reduceTheStock(Map<Long, Integer> productMap) {
        productMap.forEach((k, v) -> this.productRepository.updateProductStockOnBuy(v, k));
    }

    private void clearTheCart(Long userId) {
        cartItemsRepository.deleteAllByUserId(userId);
    }

}
