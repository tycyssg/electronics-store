package com.store.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "PRODUCT_IMAGES")
public class ProductImages implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long pImageId;
    private String name;
    @Lob
    private byte[] image;
    private Long productId;

    public ProductImages(String name, byte[] image, Long productId) {
        this.name = name;
        this.image = image;
        this.productId = productId;
    }
}
