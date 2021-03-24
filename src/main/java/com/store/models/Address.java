package com.store.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "ADDRESSES")
public class Address implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long addressId;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private String address1;
    private String address2;
    @NotNull
    private String city;
    @NotNull
    private String county;
    private String eirCode;
    private String country;
    private boolean billingAddress;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long userId;
}
