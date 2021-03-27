package com.store.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "PRODUCTS")
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long productId;
    @NotNull
    private String title;
    @NotNull
    private String manufactured;
    @NotNull
    private String description;
    @NotNull
    private Double price;
    @NotNull
    private Integer stock;
    private Integer numOfRatingCustomers;
    private Integer totalRating;
    private Double discountAmount;
    private Date expireDiscount;
    private Long categoryId;
    private Date dateCreated = new Date();

    @Transient
    private Double discountedPrice;

    @Transient
    private Double rating;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "productId")
    private List<ProductComments> images;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "productId")
    private List<ProductImages> productComments;
}
