package com.store.services;

import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Address;
import com.store.repository.AddressRepository;
import com.store.repository.UserRepository;
import com.store.selectInterfaces.UserDetails;
import com.store.services.serviceInterface.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.store.constants.ErrorConstants.ADDRESS_NOT_EXIST;
import static com.store.constants.UserImplConstant.NO_USER_FOUND_BY_USERNAME;

@Service
public class AddressServiceImpl implements AddressService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl(UserRepository userRepository, AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    public Address addAddress(Address address) throws NotExistException {
        UserDetails user = userRepository.findUserDetailsByUserId(address.getUserId().toString()).orElse(null);
        if (user == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        if (addressRepository.count() == 0)
            address.setBillingAddress(true);

        address.setUserId(user.getId());
        return addressRepository.save(address);
    }

    @Override
    public Address updateAddress(Address address) throws InvalidDataFormatException {
        if (address.getAddressId() == null)
            throw new InvalidDataFormatException();

        addressRepository.updateAddress(
                address.getName(),
                address.getSurname(),
                address.getAddress1(),
                address.getAddress2(),
                address.getCity(),
                address.getCounty(),
                address.getEirCode(),
                address.getCountry(),
                address.getAddressId()
        );

        return address;
    }

    @Override
    public void deleteAddress(Long addressId) throws NotExistException {
        if (!addressRepository.existsById(addressId))
            throw new NotExistException(ADDRESS_NOT_EXIST);

        addressRepository.deleteById(addressId);
    }

    @Override
    public void makeAddressBillingAddress(Long addressId, String userId) throws NotExistException {
        UserDetails user = userRepository.findUserDetailsByUserId(userId).orElse(null);
        if (user == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        if (!addressRepository.existsById(addressId))
            throw new NotExistException(ADDRESS_NOT_EXIST);

        addressRepository.findByBillingAddressAndUserId(true, user.getId())
                .ifPresent(currentBillingAddress -> addressRepository.makeAddressBillingAddress(false, currentBillingAddress.getAddressId()));

        addressRepository.makeAddressBillingAddress(true, addressId);
    }


}
