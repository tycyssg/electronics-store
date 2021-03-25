package com.store.repository;


import com.store.models.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentDetails, Long> {
    Optional<PaymentDetails> findByDefaultPaymentMethodAndUserId(Boolean paymentDefault, Long userId);

    @Modifying
    @Transactional
    @Query("update PaymentDetails p set p.defaultPaymentMethod = ?1 where p.paymentId = ?2")
    int makePaymentDefault(Boolean defaultPayment, Long paymentId);
}
