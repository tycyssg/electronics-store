package com.store.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "PRODUCT_COMMENTS")
public class ProductImages implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long pImageId;
    private Long dateCreated = new Date().getTime();
    private String commentedBy;
    private String commentContent;
    private Long productId;
}