package com.store.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "PRODUCT_COMMENTS")
public class ProductComments implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long commentId;
    private Long dateCreated = new Date().getTime();
    @NotNull
    private String firstImpression;
    @NotNull
    private String commentedBy;
    @NotNull
    private String commentContent;
    private Long productId;
}
