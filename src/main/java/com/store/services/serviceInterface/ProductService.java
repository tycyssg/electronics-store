package com.store.services.serviceInterface;

import com.store.models.Product;

import java.util.List;

public interface ProductService {

    Product addProduct(Product product);

    List<Product> getAllProducts();

    Product getSingleProduct(Long productId);

    void deleteProduct(Long productId);
}
