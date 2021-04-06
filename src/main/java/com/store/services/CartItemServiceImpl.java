package com.store.services;


import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.NotExistException;
import com.store.models.CartItem;
import com.store.repository.CartItemsRepository;
import com.store.repository.ProductRepository;
import com.store.repository.UserRepository;
import com.store.selectInterfaces.UserDetails;
import com.store.services.serviceInterface.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.store.constants.ErrorConstants.*;
import static com.store.constants.UserImplConstant.NO_USER_FOUND_BY_USERNAME;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final UserRepository userRepository;
    private final CartItemsRepository cartItemsRepository;
    private final ProductRepository productRepository;

    @Autowired
    public CartItemServiceImpl(UserRepository userRepository, CartItemsRepository cartItemsRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.productRepository = productRepository;
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


}
