package com.store.controllers;

import com.store.exceptions.ExceptionHandling;
import com.store.exceptions.model.*;
import com.store.models.Address;
import com.store.models.User;
import com.store.models.UserPrincipal;
import com.store.services.serviceInterface.AddressService;
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

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider, AddressService addressService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.addressService = addressService;
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
    public ResponseEntity<String> register(@Valid @RequestBody User user, BindingResult bindingResult) throws UsernameExistException, EmailExistException, InvalidDataFormatException {
        if (bindingResult.hasErrors()) throw new InvalidDataFormatException();

        String response = userService.register(user);
        return new ResponseEntity<>(response, OK);
    }


    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) throws UsernameExistException, EmailExistException, InvalidDataFormatException, ExistException {
        userService.updateUser(user);
        return new ResponseEntity<>(user, OK);
    }

    @PostMapping("/addAddress")
    public ResponseEntity<Address> addAddress(@Valid @RequestBody Address address, BindingResult bindingResult) throws InvalidDataFormatException, NotExistException {
        if (bindingResult.hasErrors()) throw new InvalidDataFormatException();

        return new ResponseEntity<>(addressService.addAddress(address), OK);
    }

    @PutMapping("/updateAddress")
    public ResponseEntity<Address> updateAddress(@Valid @RequestBody Address address, BindingResult bindingResult) throws InvalidDataFormatException, NotExistException {
        if (bindingResult.hasErrors()) throw new InvalidDataFormatException();

        return new ResponseEntity<>(addressService.updateAddress(address), OK);
    }

    @GetMapping("/makeBillingAddress/{addressId}/{userId}")
    public ResponseEntity<Long> makeBillingAddress(@PathVariable("addressId") Long addressId, @PathVariable("userId") String userId) throws NotExistException {
        addressService.makeAddressBillingAddress(addressId, userId);
        return new ResponseEntity<>(addressId, OK);
    }

    @GetMapping("/deleteAddress/{addressId}")
    public ResponseEntity<Long> deleteAddress(@PathVariable("addressId") Long addressId) throws NotExistException {
        addressService.deleteAddress(addressId);
        return new ResponseEntity<>(addressId, OK);
    }
}
