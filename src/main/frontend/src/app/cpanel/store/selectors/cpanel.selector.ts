import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { NGRX_STATE_CPANEL_APP } from '../../../app-constants';
import { CpanelState } from '../models/cpanel-state';
import { CategoryState } from '../models/category-state';
import { UsersState } from '../models/users-state';


const cpSelector: MemoizedSelector<State, CpanelState> = createFeatureSelector(NGRX_STATE_CPANEL_APP);

export const getCategoriesSelector: MemoizedSelector<State, CategoryState> = createSelector(
  cpSelector,
  (state: CpanelState) => state.categories
);

export const getUsersSelector: MemoizedSelector<State, UsersState> = createSelector(
  cpSelector,
  (state: CpanelState) => state.users
);
