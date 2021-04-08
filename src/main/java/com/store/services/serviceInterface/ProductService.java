package com.store.services.serviceInterface;

import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Product;
import com.store.models.ProductComments;
import com.store.models.ProductImages;
import com.store.selectInterfaces.UpdatedRating;
import com.store.selectInterfaces.UpdatedStock;

public interface ProductService {

    Product addProduct(Product product) throws InvalidDataFormatException, NotExistException;

    Product updateProduct(Product product) throws NotExistException, InvalidDataFormatException;

    void deleteProduct(Long productId) throws NotExistException;

    UpdatedStock updateProductStock(Integer stock, Long productId) throws NotExistException, InvalidDataFormatException;

    UpdatedRating updateRating(Integer customerRating, Long productId) throws NotExistException, InvalidDataFormatException;

    UpdatedStock updateProductStockOnBuy(Integer quantity, Long productId) throws InvalidDataFormatException;

    ProductImages addProductImage(ProductImages productImages) throws NotExistException;

    ProductComments addProductComment(ProductComments productComments) throws NotExistException, InvalidDataFormatException;

    Product getProduct(Long productId);

}
