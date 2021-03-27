import { createAction, props } from '@ngrx/store';
import { IdModel } from '../../../store/model/id.model';
import { Category } from '../../model/category.model';
import { CategoryState } from '../models/category-state';

export const actionIdentifier = '[App User Category] active';

export const CategoryTypes = {
  requestAddCategory: `${actionIdentifier} Request add Category`,
  addCategory: `${actionIdentifier} add Category`,
  requestGetCategories: `${actionIdentifier} Request get Categories`,
  getCategories: `${actionIdentifier} get Categories`,
  requestUpdateCategory: `${actionIdentifier} Request update Category`,
  updateCategory: `${actionIdentifier} update Category`,
  requestDeleteCategory: `${actionIdentifier} Request Delete Category`,
  deleteCategory: `${actionIdentifier} delete Category`,
};

export const RequestAddCategoryAction = createAction(CategoryTypes.requestAddCategory, props<Category>());
export const AddCategoryAction = createAction(CategoryTypes.addCategory, props<Category>());

export const RequestGetCategoriesAction = createAction(CategoryTypes.requestGetCategories);
export const GetCategoriesAction = createAction(CategoryTypes.getCategories, props<CategoryState>());

export const RequestUpdateCategoryAction = createAction(CategoryTypes.requestUpdateCategory, props<Category>());
export const UpdateCategoryAction = createAction(CategoryTypes.updateCategory, props<Category>());

export const RequestDeleteCategoryAction = createAction(CategoryTypes.requestDeleteCategory, props<IdModel>());
export const DeleteCategoryAction = createAction(CategoryTypes.deleteCategory, props<IdModel>());

