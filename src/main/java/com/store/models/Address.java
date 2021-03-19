package com.store.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "ADDRESSES")
public class Address implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long addressId;
    private String address1;
    private String address2;
    private String county;
    private String eirCode;
    private String country;
    private boolean isBillingAddress;
    private Long userId;
}
