package com.store.services.serviceInterface;

import com.store.exceptions.model.NotExistException;
import com.store.models.PaymentDetails;


public interface PaymentService {
    PaymentDetails addPayment(PaymentDetails payment) throws NotExistException;

    void deletePayment(Long paymentId) throws NotExistException;

    void makeDefaultPayment(Long paymentId, String userId) throws NotExistException;
}
