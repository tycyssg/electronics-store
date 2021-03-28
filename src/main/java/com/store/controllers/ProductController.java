package com.store.controllers;

import com.store.exceptions.ExceptionHandling;
import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Product;
import com.store.models.ProductComments;
import com.store.models.ProductImages;
import com.store.selectInterfaces.UpdatedRating;
import com.store.selectInterfaces.UpdatedStock;
import com.store.services.serviceInterface.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;


@RestController
@RequestMapping("/api")
public class ProductController extends ExceptionHandling {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/uploadImages/{productId}")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<ProductImages> uploadImages(@PathVariable("productId") Long productId, @RequestParam("image") MultipartFile image) throws IOException, NotExistException {
        ProductImages p = new ProductImages(image.getOriginalFilename(), image.getBytes(), productId);

        return new ResponseEntity<>(productService.addProductImage(p), HttpStatus.OK);
    }

    @PostMapping("/addProduct")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<Product> addProduct(@Valid @RequestBody Product product, BindingResult bindingResult) throws NotExistException, InvalidDataFormatException {
        if (bindingResult.hasErrors())
            throw new InvalidDataFormatException();

        return new ResponseEntity<>(productService.addProduct(product), HttpStatus.OK);
    }

    @PostMapping("/addProductComment")
    @ResponseBody
    public ResponseEntity<ProductComments> addProductComment(@Valid @RequestBody ProductComments comment, BindingResult bindingResult) throws NotExistException, InvalidDataFormatException {
        if (bindingResult.hasErrors())
            throw new InvalidDataFormatException();

        return new ResponseEntity<>(productService.addProductComment(comment), HttpStatus.OK);
    }

    @PutMapping("/updateProduct")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product, BindingResult bindingResult) throws NotExistException, InvalidDataFormatException {
        if (bindingResult.hasErrors())
            throw new InvalidDataFormatException();

        return new ResponseEntity<>(productService.updateProduct(product), HttpStatus.OK);
    }


    @DeleteMapping("/deleteProduct/{productId}")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<Long> deleteProduct(@PathVariable("productId") Long productId) throws NotExistException, InvalidDataFormatException {
        productService.deleteProduct(productId);

        return new ResponseEntity<>(productId, HttpStatus.OK);
    }


    @PutMapping("/updateProductStock/{productId}")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<UpdatedStock> updateProductStock(@PathVariable("productId") Long productId, @RequestParam("stock") Integer stock) throws NotExistException, InvalidDataFormatException {
        return new ResponseEntity<>(productService.updateProductStock(stock, productId), HttpStatus.OK);
    }

    @PutMapping("/updateRating/{productId}")
    @ResponseBody
    public ResponseEntity<UpdatedRating> updateRating(@PathVariable("productId") Long productId, @RequestParam("customerRating") Integer rating) throws NotExistException, InvalidDataFormatException {
        return new ResponseEntity<>(productService.updateRating(rating, productId), HttpStatus.OK);
    }

}
