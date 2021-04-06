package com.store.controllers;

import com.store.exceptions.ExceptionHandling;
import com.store.exceptions.model.*;
import com.store.models.*;
import com.store.services.serviceInterface.AddressService;
import com.store.services.serviceInterface.CartItemService;
import com.store.services.serviceInterface.PaymentService;
import com.store.services.serviceInterface.UserService;
import com.store.utility.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.store.constants.SecurityConstants.EXPIRATION_TIME;
import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping("/api")
public class UserController extends ExceptionHandling {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTTokenProvider jwtTokenProvider;
    private final AddressService addressService;
    private final PaymentService paymentService;
    private final CartItemService cartItemService;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider, AddressService addressService, PaymentService paymentService, CartItemService cartItemService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.addressService = addressService;
        this.paymentService = paymentService;
        this.cartItemService = cartItemService;
    }


    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<User> login(@RequestBody User user) {

        authenticate(user.getUsername(), user.getPassword());
        User loginUser = userService.findUserByUsername(user.getUsername());
        UserPrincipal userPrincipal = new UserPrincipal(loginUser);

        loginUser.setExpiresIn(EXPIRATION_TIME);
        loginUser.setToken(jwtTokenProvider.generateJwtToken(userPrincipal));

        return new ResponseEntity<>(loginUser, HttpStatus.OK);
    }


    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }


    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> register(@Valid @RequestBody User user, BindingResult bindingResult) throws UsernameExistException, EmailExistException, InvalidDataFormatException {
        if (bindingResult.hasErrors()) throw new InvalidDataFormatException();

        String response = userService.register(user);
        return new ResponseEntity<>(response, OK);
    }


    @PutMapping("/updateUser")
    @ResponseBody
    public ResponseEntity<User> updateUser(@RequestBody User user) throws UsernameExistException, EmailExistException, InvalidDataFormatException, ExistException {
        userService.updateUser(user);
        return new ResponseEntity<>(user, OK);
    }

    @PostMapping("/addAddress")
    @ResponseBody
    public ResponseEntity<Address> addAddress(@Valid @RequestBody Address address, BindingResult bindingResult) throws InvalidDataFormatException, NotExistException {
        if (bindingResult.hasErrors()) throw new InvalidDataFormatException();

        return new ResponseEntity<>(addressService.addAddress(address), OK);
    }

    @PutMapping("/updateAddress")
    @ResponseBody
    public ResponseEntity<Address> updateAddress(@Valid @RequestBody Address address, BindingResult bindingResult) throws InvalidDataFormatException, NotExistException {
        if (bindingResult.hasErrors()) throw new InvalidDataFormatException();

        return new ResponseEntity<>(addressService.updateAddress(address), OK);
    }

    @GetMapping("/makeBillingAddress/{addressId}/{userId}")
    @ResponseBody
    public ResponseEntity<Long> makeBillingAddress(@PathVariable("addressId") Long addressId, @PathVariable("userId") String userId) throws NotExistException {
        addressService.makeAddressBillingAddress(addressId, userId);
        return new ResponseEntity<>(addressId, OK);
    }

    @DeleteMapping("/deleteAddress/{addressId}")
    @ResponseBody
    public ResponseEntity<Long> deleteAddress(@PathVariable("addressId") Long addressId) throws NotExistException {
        addressService.deleteAddress(addressId);
        return new ResponseEntity<>(addressId, OK);
    }


    @PostMapping("/addPayment")
    @ResponseBody
    public ResponseEntity<PaymentDetails> addPayment(@Valid @RequestBody PaymentDetails paymentDetails, BindingResult bindingResult) throws InvalidDataFormatException, NotExistException {
        if (bindingResult.hasErrors()) throw new InvalidDataFormatException();

        return new ResponseEntity<>(paymentService.addPayment(paymentDetails), OK);
    }


    @GetMapping("/makeDefaultPayment/{paymentId}/{userId}")
    @ResponseBody
    public ResponseEntity<Long> makeDefaultPayment(@PathVariable("paymentId") Long paymentId, @PathVariable("userId") String userId) throws NotExistException {
        paymentService.makeDefaultPayment(paymentId, userId);
        return new ResponseEntity<>(paymentId, OK);
    }

    @DeleteMapping("/deletePayment/{paymentId}")
    @ResponseBody
    public ResponseEntity<Long> deletePayment(@PathVariable("paymentId") Long paymentId) throws NotExistException {
        paymentService.deletePayment(paymentId);
        return new ResponseEntity<>(paymentId, OK);
    }

    @PostMapping("/addCartItem")
    @ResponseBody
    public ResponseEntity<CartItem> addCartItem(@Valid @RequestBody CartItem cartItem, BindingResult bindingResult) throws InvalidDataFormatException, NotExistException, ExistException {
        if (bindingResult.hasErrors()) throw new InvalidDataFormatException();

        return new ResponseEntity<>(cartItemService.addCartItem(cartItem), OK);
    }

    @PutMapping("/updateCartItemPlus/{cartItemId}")
    @ResponseBody
    public ResponseEntity<Long> updateCartItemPlus(@PathVariable("cartItemId") Long cartItemId) throws NotExistException {
        cartItemService.updateCartItemQuantityPlus(cartItemId);
        return new ResponseEntity<>(cartItemId, OK);
    }

    @PutMapping("/updateCartItemMinus/{cartItemId}")
    @ResponseBody
    public ResponseEntity<Long> updateCartItemMinus(@PathVariable("cartItemId") Long cartItemId) throws NotExistException {
        cartItemService.updateCartItemQuantityMinus(cartItemId);
        return new ResponseEntity<>(cartItemId, OK);
    }

    @DeleteMapping("/deleteCartItem/{cartItemId}")
    @ResponseBody
    public ResponseEntity<Long> deleteCartItem(@PathVariable("cartItemId") Long cartItemId) throws NotExistException {
        cartItemService.deleteCartItem(cartItemId);
        return new ResponseEntity<>(cartItemId, OK);
    }
}
