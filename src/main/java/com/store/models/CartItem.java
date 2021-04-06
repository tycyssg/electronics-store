package com.store.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "CART_ITEMS")
public class CartItem implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long cartItemId;
    @NotNull
    private Long productId;
    @Min(value = 0)
    private Integer productQuantity;
    private Long userId;
}
