package com.store.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
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
    @Min(value = 0)
    private Double price = 0.0;
    @Min(value = 0)
    private Integer stock = 0;
    private Integer numOfRatingCustomers = 0;
    private Integer totalRating = 0;
    @Min(value = 0)
    private Double discountAmount = 0.0;
    private Date expireDiscount;
    private Long categoryId;
    private Date dateCreated = new Date();


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "productId")
    private List<ProductComments> images;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "productId")
    private List<ProductImages> productComments;


}
