package com.store.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "PRODUCT_IMAGES")
public class ProductComments implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long pImageId;
    private String path;
    private String name;
    @Lob
    private byte[] image;
    private Long productId;
}
