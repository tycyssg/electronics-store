package com.store.repository;


import com.store.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findByBillingAddressAndUserId(Boolean isBilling, Long userId);

    @Modifying
    @Transactional
    @Query("update Address a set a.name = ?1, a.surname = ?2, a.address1 = ?3, a.address2 = ?4, a.city = ?5, a.county = ?6, a.eirCode = ?7, a.country = ?8 where a.addressId = ?9")
    int updateAddress(String name, String surname, String address1, String address2, String city, String county, String eirCode, String country, Long addressId);

    @Modifying
    @Transactional
    @Query("update Address a set a.billingAddress = ?1 where a.addressId = ?2")
    int makeAddressBillingAddress(Boolean billingAddress, Long addressId);
}
