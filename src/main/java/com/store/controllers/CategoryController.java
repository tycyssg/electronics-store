package com.store.controllers;

import com.store.exceptions.ExceptionHandling;
import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Category;
import com.store.services.serviceInterface.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController extends ExceptionHandling {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/addCategory")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<Category> addCategory(@Valid @RequestBody Category category, BindingResult bindingResult) throws ExistException, InvalidDataFormatException {
        if (bindingResult.hasErrors())
            throw new InvalidDataFormatException();

        return new ResponseEntity<>(categoryService.addCategory(category), HttpStatus.OK);
    }

    @PutMapping("/updateCategory")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category, BindingResult bindingResult) throws NotExistException, ExistException, InvalidDataFormatException {
        if (bindingResult.hasErrors())
            throw new InvalidDataFormatException();

        return new ResponseEntity<>(categoryService.updateCategory(category), HttpStatus.OK);
    }

    @GetMapping("/getAllCategories")
    @ResponseBody
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @DeleteMapping("/deleteCategory/{categoryId}")
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('u:a')")
    public ResponseEntity<Long> deleteCategory(@PathVariable("categoryId") Long categoryId) throws NotExistException, InvalidDataFormatException {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(categoryId, HttpStatus.OK);
    }

}
