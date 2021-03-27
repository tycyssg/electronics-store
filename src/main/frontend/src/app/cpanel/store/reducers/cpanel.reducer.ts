import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CategoryState } from '../models/category-state';
import * as CategoryAction from '../../../cpanel/store/actions/categories.actions';


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
);


export function categoryReducer(state: CategoryState, action: Action): any {
  return cpReducer(state, action);
}
