import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CategoryState } from '../models/category-state';
import * as CategoryAction from '../../../cpanel/store/actions/categories.actions';
import * as ProductAction from '../../../cpanel/store/actions/products.actions';

export const initialState: CategoryState = {categories: []};

const cpReducer: ActionReducer<CategoryState, Action> = createReducer(
  initialState,
  on(CategoryAction.AddCategoryAction, (state: CategoryState, action: any) => ({
    ...state,
    categories: [...state.categories, action]
  })),
  on(CategoryAction.GetCategoriesAction, (state: CategoryState, action: any) => ({
    ...state,
    categories: [...action.categories]
  })),
  on(CategoryAction.UpdateCategoryAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.categoryId == action.categoryId);
    const updatedCategory = {
      ...state.categories[categoryIndex],
      categoryName: action.categoryName
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
  on(CategoryAction.DeleteCategoryAction, (state: CategoryState, action: any) => ({
    ...state,
    categories: state.categories.filter(c => c.categoryId !== action.id)
  })),
  on(ProductAction.AddProductAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.categoryId == action.categoryId);

    const updatedCategory = {
      ...state.categories[categoryIndex],
      products: [...state.categories[categoryIndex].products, action]
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
  on(ProductAction.UpdateProductAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.products.some(p => p.productId === action.productId));
    const productIndex = state.categories[categoryIndex].products.findIndex(p => p.productId === action.productId);
    const currentProduct = state.categories[categoryIndex].products[productIndex];

    const updatedProduct = {
      ...currentProduct,
      title: action.title,
      manufactured: action.manufactured,
      description: action.description,
      price: action.price,
      stock: action.stock,
      discountAmount: action.discountAmount,
      expireDiscount: action.expireDiscount,
      warranty: action.warranty
    }

    const updatedCategory = {
      ...state.categories[categoryIndex],
      products: [
        ...state.categories[categoryIndex].products.slice(0, productIndex),
        updatedProduct,
        ...state.categories[categoryIndex].products.slice(productIndex + 1, state.categories[categoryIndex].products.length)
      ]
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
  on(ProductAction.DeleteProductAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.products.some(p => p.productId === action.productId));

    const updatedCategory = {
      ...state.categories[categoryIndex],
      products: state.categories[categoryIndex].products.filter(p => p.productId !== action.id)
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
  on(ProductAction.UpdateProductStockAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.products.some(p => p.productId === action.productId));
    const productIndex = state.categories[categoryIndex].products.findIndex(p => p.productId === action.productId);
    const currentProduct = state.categories[categoryIndex].products[productIndex];

    const updatedCategory = {
      ...state.categories[categoryIndex],
      products: [
        ...state.categories[categoryIndex].products.slice(0, productIndex),
        {
          ...currentProduct,
          stock: action.stock
        },
        ...state.categories[categoryIndex].products.slice(productIndex + 1, state.categories[categoryIndex].products.length)
      ]
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
  on(ProductAction.UpdateProductImageAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.products.some(p => p.productId === action.productId));
    const productIndex = state.categories[categoryIndex].products.findIndex(p => p.productId === action.productId);
    const currentProduct = state.categories[categoryIndex].products[productIndex];

    const updatedProduct = {
      ...currentProduct,
      images: [...currentProduct?.images, action]
    }

    const updatedCategory = {
      ...state.categories[categoryIndex],
      products: [
        ...state.categories[categoryIndex].products.slice(0, productIndex),
        updatedProduct,
        ...state.categories[categoryIndex].products.slice(productIndex + 1, state.categories[categoryIndex].products.length)
      ]
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
  on(ProductAction.AddProductRatingAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.products.some(p => p.productId === action.productId));
    const productIndex = state.categories[categoryIndex].products.findIndex(p => p.productId === action.productId);
    const currentProduct = state.categories[categoryIndex].products[productIndex];

    const updatedCategory = {
      ...state.categories[categoryIndex],
      products: [
        ...state.categories[categoryIndex].products.slice(0, productIndex),
        {
          ...currentProduct,
          numOfRatingCustomers: action.numOfRatingCustomers,
          totalRating: action.totalRating
        },
        ...state.categories[categoryIndex].products.slice(productIndex + 1, state.categories[categoryIndex].products.length)
      ]
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
  on(ProductAction.AddProductCommentAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.products.some(p => p.productId === action.productId));
    const productIndex = state.categories[categoryIndex].products.findIndex(p => p.productId === action.productId);
    const currentProduct = state.categories[categoryIndex].products[productIndex];

    const updatedProduct = {
      ...currentProduct,
      productComments: [...currentProduct.productComments, action]
    }

    const updatedCategory = {
      ...state.categories[categoryIndex],
      products: [
        ...state.categories[categoryIndex].products.slice(0, productIndex),
        updatedProduct,
        ...state.categories[categoryIndex].products.slice(productIndex + 1, state.categories[categoryIndex].products.length)
      ]
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
  on(ProductAction.SimulateBuyAction, (state: CategoryState, action: any) => {
    const categoryIndex = state.categories.findIndex(c => c.products.some(p => p.productId === action.productId));
    const productIndex = state.categories[categoryIndex].products.findIndex(p => p.productId === action.productId);
    const currentProduct = state.categories[categoryIndex].products[productIndex];

    const updatedCategory = {
      ...state.categories[categoryIndex],
      products: [
        ...state.categories[categoryIndex].products.slice(0, productIndex),
        {
          ...currentProduct,
          stock: action.stock
        },
        ...state.categories[categoryIndex].products.slice(productIndex + 1, state.categories[categoryIndex].products.length)
      ]
    };

    return ({
      ...state,
      categories: [
        ...state.categories.slice(0, categoryIndex),
        updatedCategory,
        ...state.categories.slice(categoryIndex + 1, state.categories.length),
      ]
    })
  }),
);


export function categoryReducer(state: CategoryState, action: Action): any {
  return cpReducer(state, action);
}
