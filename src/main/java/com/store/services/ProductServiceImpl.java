package com.store.services;

import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Product;
import com.store.models.ProductComments;
import com.store.models.ProductImages;
import com.store.repository.CategoryRepository;
import com.store.repository.ProductCommentRepository;
import com.store.repository.ProductImagesRepository;
import com.store.repository.ProductRepository;
import com.store.selectInterfaces.UpdatedRating;
import com.store.selectInterfaces.UpdatedStock;
import com.store.services.serviceInterface.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.store.constants.ErrorConstants.CATEGORY_NOT_EXIST;
import static com.store.constants.ErrorConstants.PRODUCT_NOT_EXIST;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImagesRepository productImagesRepository;
    private final ProductCommentRepository productCommentRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, ProductImagesRepository productImagesRepository, ProductCommentRepository productCommentRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productImagesRepository = productImagesRepository;
        this.productCommentRepository = productCommentRepository;
    }

    @Override
    public Product addProduct(Product product) throws InvalidDataFormatException, NotExistException {
        if (product.getCategoryId() == null)
            throw new InvalidDataFormatException();

        if (!categoryRepository.existsById(product.getCategoryId()))
            throw new NotExistException(CATEGORY_NOT_EXIST);


        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) throws NotExistException, InvalidDataFormatException {
        if (product.getStock() < 0 || product.getPrice() < 0)
            throw new InvalidDataFormatException();

        if (!productRepository.existsById(product.getProductId()))
            throw new NotExistException(PRODUCT_NOT_EXIST);

        productRepository.updateProduct(product.getTitle(), product.getManufactured(), product.getDescription(), product.getPrice(), product.getStock(), product.getDiscountAmount(), product.getExpireDiscount(), product.getProductId());
        return product;
    }


    @Override
    public void deleteProduct(Long productId) throws NotExistException {
        if (!productRepository.existsById(productId))
            throw new NotExistException(PRODUCT_NOT_EXIST);

        productRepository.deleteById(productId);
    }

    @Override
    public UpdatedStock updateProductStock(Integer stock, Long productId) throws NotExistException, InvalidDataFormatException {
        if (stock < 0)
            throw new InvalidDataFormatException();

        if (!productRepository.existsById(productId))
            throw new NotExistException(PRODUCT_NOT_EXIST);

        productRepository.updateProductStock(stock, productId);
        return productRepository.findUpdatedStockByProductId(productId);
    }

    @Override
    public UpdatedRating updateRating(Integer customerRating, Long productId) throws NotExistException, InvalidDataFormatException {
        if (customerRating < 0 || customerRating > 5)
            throw new InvalidDataFormatException();

        if (!productRepository.existsById(productId))
            throw new NotExistException(PRODUCT_NOT_EXIST);

        productRepository.updateRating(1, customerRating, productId);
        return productRepository.findUpdatedRatingByProductId(productId);
    }

    @Override
    public UpdatedStock updateProductStockOnBuy(Integer quantity, Long productId) throws InvalidDataFormatException {
        if (quantity < 0)
            throw new InvalidDataFormatException();

        productRepository.updateProductStockOnBuy(quantity, productId);
        return productRepository.findUpdatedStockByProductId(productId);
    }

    @Override
    public ProductImages addProductImage(ProductImages productImages) throws NotExistException {
        if (!productRepository.existsById(productImages.getProductId()))
            throw new NotExistException(PRODUCT_NOT_EXIST);

        return productImagesRepository.save(productImages);
    }

    @Override
    public ProductComments addProductComment(ProductComments productComments) throws NotExistException {
        if (!productRepository.existsById(productComments.getProductId()))
            throw new NotExistException(PRODUCT_NOT_EXIST);

        return productCommentRepository.save(productComments);
    }

    @Override
    public Product getProduct(Long productId) {
        Product p = productRepository.findById(productId).orElse(null);
        // p.setImages(productImagesRepository.findAllByProductId(p.getProductId()));
        return p;
    }

    @Override
    public List<Product> getAllProducts() {
        return null;
    }

    @Override
    public Product getSingleProduct(Long productId) {
        return null;
    }

}
