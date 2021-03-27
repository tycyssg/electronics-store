package com.store.services;

import com.store.exceptions.model.ExistException;
import com.store.exceptions.model.InvalidDataFormatException;
import com.store.exceptions.model.NotExistException;
import com.store.models.Category;
import com.store.repository.CategoryRepository;
import com.store.services.serviceInterface.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.store.constants.ErrorConstants.CATEGORY_EXIST;
import static com.store.constants.ErrorConstants.CATEGORY_NOT_EXIST;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category addCategory(Category category) throws ExistException {
        if (categoryRepository.existsByCategoryName(category.getCategoryName()))
            throw new ExistException(CATEGORY_EXIST);

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) throws InvalidDataFormatException, NotExistException, ExistException {
        if (category.getCategoryId() == null)
            throw new InvalidDataFormatException();

        if (!categoryRepository.existsById(category.getCategoryId()))
            throw new NotExistException(CATEGORY_NOT_EXIST);

        if (categoryRepository.existsByCategoryName(category.getCategoryName()))
            throw new ExistException(CATEGORY_EXIST);

        categoryRepository.updateCategory(category.getCategoryName(), category.getCategoryId());

        return category;
    }

    @Override
    public void deleteCategory(Long categoryId) throws InvalidDataFormatException, NotExistException {
        if (categoryId == null)
            throw new InvalidDataFormatException();

        if (!categoryRepository.existsById(categoryId))
            throw new NotExistException(CATEGORY_NOT_EXIST);

        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category getCategory(Long categoryId) {
        return null;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
