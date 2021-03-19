package com.store.services.serviceInterface;

import com.store.models.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category);

    void deleteCategory(Long categoryId);

    Category getCategory(Long categoryId);

    List<Category> getAllCategories();
}
