package com.store.services.serviceInterface;

import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Address;


public interface AddressService {
    Address addAddress(Address address) throws NotExistException;

    Address updateAddress(Address address) throws InvalidDataFormatException;

    void deleteAddress(Long addressId) throws NotExistException;

    void makeAddressBillingAddress(Long addressId, String userId) throws NotExistException;
}
