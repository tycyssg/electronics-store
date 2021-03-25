package com.store.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "PAYMENTS_DETAILS")
public class PaymentDetails implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long paymentId;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 16, max = 16)
    @NotNull
    private String cardNo;
    private String cardNoDisplay;
    @NotNull
    private String expireDate;
    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String cvv;
    private Boolean defaultPaymentMethod;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long userId;
}
