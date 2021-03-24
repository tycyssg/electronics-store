package com.store.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "PAYMENTS_DETAILS")
public class PaymentDetails implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long paymentId;
    private String cardNo;
    private String expireDate;
    private String cvv;
    private Boolean defaultPaymentMethod;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long userId;
}
