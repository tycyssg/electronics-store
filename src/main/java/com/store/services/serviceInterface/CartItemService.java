package com.store.services.serviceInterface;

import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.NotExistException;
import com.store.models.CartItem;


public interface CartItemService {

    CartItem addCartItem(CartItem cartItem) throws NotExistException, ExistException;

    void deleteCartItem(Long cartItemId) throws NotExistException;

    void updateCartItemQuantityPlus(Long cartItemId) throws NotExistException;

    void updateCartItemQuantityMinus(Long cartItemId) throws NotExistException;

}
