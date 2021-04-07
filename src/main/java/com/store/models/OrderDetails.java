package com.store.models;


import com.fasterxml.jackson.databind.JsonNode;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "ORDER_DETAILS")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class OrderDetails implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long orderId;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    @NotNull
    private JsonNode products;
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    @NotNull
    private JsonNode address;
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    @NotNull
    private JsonNode payment;
    private Date orderDate = new Date();
    @NotNull
    @Min(value = 0)
    private Double orderTotal;
    private Long userId;
}
