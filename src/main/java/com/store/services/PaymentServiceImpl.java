package com.store.services;

import com.store.exceptions.model.NotExistException;
import com.store.models.PaymentDetails;
import com.store.repository.PaymentRepository;
import com.store.repository.UserRepository;
import com.store.selectInterfaces.UserDetails;
import com.store.services.serviceInterface.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.store.constants.ErrorConstants.PAYMENT_NOT_EXIST;
import static com.store.constants.UserImplConstant.NO_USER_FOUND_BY_USERNAME;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentServiceImpl(UserRepository userRepository, PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
    }


    @Override
    public PaymentDetails addPayment(PaymentDetails payment) throws NotExistException {
        UserDetails user = userRepository.findUserDetailsByUserId(payment.getUserId().toString()).orElse(null);
        if (user == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        if (paymentRepository.count() == 0)
            payment.setDefaultPaymentMethod(true);

        payment.setUserId(user.getId());
        String cardNo = payment.getCardNo().trim();
        String displayCard = "XXXX-XXXX-XXXX-" + cardNo.substring(cardNo.length() - 4);
        payment.setCardNoDisplay(displayCard);
        return paymentRepository.save(payment);
    }

    @Override
    public void deletePayment(Long paymentId) throws NotExistException {
        if (!paymentRepository.existsById(paymentId))
            throw new NotExistException(PAYMENT_NOT_EXIST);

        paymentRepository.deleteById(paymentId);
    }

    @Override
    public void makeDefaultPayment(Long paymentId, String userId) throws NotExistException {
        UserDetails user = userRepository.findUserDetailsByUserId(userId).orElse(null);
        if (user == null)
            throw new NotExistException(NO_USER_FOUND_BY_USERNAME);

        if (!paymentRepository.existsById(paymentId))
            throw new NotExistException(PAYMENT_NOT_EXIST);

        paymentRepository.findByDefaultPaymentMethodAndUserId(true, user.getId())
                .ifPresent(currentPayment -> paymentRepository.makePaymentDefault(false, currentPayment.getPaymentId()));

        paymentRepository.makePaymentDefault(true, paymentId);
    }
}
