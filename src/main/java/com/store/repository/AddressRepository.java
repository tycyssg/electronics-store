package com.store.repository;


import com.store.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    @Modifying
    @Transactional
    @Query("update Address a set a.isBillingAddress = ?1 where a.addressId = ?2")
    int makeAddressBillingAddress(Boolean isBillingAddress, Long addressId);
}
