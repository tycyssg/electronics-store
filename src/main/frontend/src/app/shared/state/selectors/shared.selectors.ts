import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../../../store/model/appState';
import { NGRX_STATE_FEATURE_APP } from '../../../app-constants';
import { State } from '../../../store/model/root.state';
import { IsLoading } from '../models/isLoading.model';
import { ErrorHandler } from '../models/error-handler.model';


const shareSelector: MemoizedSelector<State, AppState> = createFeatureSelector(NGRX_STATE_FEATURE_APP);


export const getIsLoadingSelector: MemoizedSelector<State, IsLoading> = createSelector(
  shareSelector,
  (state: AppState) => state.loader
);

export const errorHandlerSelector: MemoizedSelector<State, ErrorHandler> = createSelector(
  shareSelector,
  (state: AppState) => state.errorHandler
);



