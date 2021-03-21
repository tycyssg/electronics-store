import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsLoading } from '../models/isLoading.model';
import { LoaderAction } from '../actions/loader.action';

;

export const initialState: IsLoading = {isLoading: false};

const reducer: ActionReducer<IsLoading, Action> = createReducer(
  initialState,
  on(LoaderAction, (state: IsLoading, action: any) => ({...state, isLoading: action.isLoading}))
);

export function loaderReducer(state: IsLoading, action: Action) {
  return reducer(state, action);
}
