package com.store.controllers;

import com.store.exceptions.ExceptionHandling;
import com.store.models.ProductImages;
import com.store.repository.ProductImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4900")
public class ProductController extends ExceptionHandling {

    @Autowired
    private ProductImagesRepository productImagesRepository;

    @PostMapping("/uploadImages/{productId}")
    @ResponseBody
    public ResponseEntity<String> uploadImages(@PathVariable("productId") Long productId, @RequestParam("image") MultipartFile image) throws IOException {
        productImagesRepository.save(new ProductImages("", image.getOriginalFilename(), image.getBytes(), null));
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/getAllImages")
    @ResponseBody
    public ResponseEntity<List<ProductImages>> getAllImages() throws IOException {
        return new ResponseEntity<>(productImagesRepository.findAll(), HttpStatus.OK);
    }
}
