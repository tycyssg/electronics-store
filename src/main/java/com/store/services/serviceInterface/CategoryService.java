package com.store.services.serviceInterface;

import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category) throws ExistException;

    Category updateCategory(Category category) throws InvalidDataFormatException, NotExistException, ExistException;

    void deleteCategory(Long categoryId) throws InvalidDataFormatException, NotExistException;

    Category getCategory(Long categoryId);

    List<Category> getAllCategories();
}
