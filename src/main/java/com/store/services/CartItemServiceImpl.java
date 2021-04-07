package com.store.services;


import com.fasterxml.jackson.databind.JsonNode;
import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.CartItem;
import com.store.models.OrderDetails;
import com.store.repository.CartItemsRepository;
import com.store.repository.OrderRepository;
import com.store.repository.ProductRepository;
import com.store.repository.UserRepository;
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

    @Autowired
    public CartItemServiceImpl(UserRepository userRepository, CartItemsRepository cartItemsRepository, ProductRepository productRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
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
    public OrderDetails makePayment(OrderDetails orderDetails) throws ExistException, NotExistException, InvalidDataFormatException {
        if (orderDetails.getUserId() == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        UserDetails user = userRepository.findUserDetailsByUserId(orderDetails.getUserId().toString()).orElse(null);

        if (user == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        Map<Long, Integer> productMap = deserializeProductJson(orderDetails.getProducts());

        if (productMap.isEmpty())
            throw new NotExistException(CART_EMPTY);

        List<OrderProduct> dbProducts = extractCartProductsFromDb(productMap);

        boolean stockIsCorrect = checkIfStockIsCorrect(dbProducts, productMap);
        boolean correctPrice = checkTotalPrice(dbProducts, productMap, orderDetails.getOrderTotal());

        if (stockIsCorrect && correctPrice) {
            reduceTheStock(productMap);
            clearTheCart(user.getId());
        } else {
            throw new InvalidDataFormatException(ORDER_NOT_COMPLETE);
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

    private boolean checkIfStockIsCorrect(List<OrderProduct> dbProducts, Map<Long, Integer> productMap) throws InvalidDataFormatException {
        for (OrderProduct o : dbProducts) {
            Integer cartQuantity = productMap.get(o.getProductId());
            if (cartQuantity == null)
                throw new InvalidDataFormatException(INVALID_PRODUCT_QUANTITY);

            if (o.getStock() - cartQuantity < 0)
                throw new InvalidDataFormatException(LOW_STOCK);
        }

        return true;
    }

    private boolean checkTotalPrice(List<OrderProduct> dbProducts, Map<Long, Integer> productMap, Double totalPrice) {
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
        return calculatedTotal.equals(totalPrice);
    }

    private void reduceTheStock(Map<Long, Integer> productMap) {
        productMap.forEach((k, v) -> this.productRepository.updateProductStockOnBuy(v, k));
    }

    private void clearTheCart(Long userId) {
        cartItemsRepository.deleteAllByUserId(userId);
    }

}
