import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState } from '../state/auth-state';
import { State } from '../../../store/model/root.state';
import { NGRX_STATE_FEATURE_AUTH } from '../../../app-constants';
import { AuthUserModel } from '../models/authUser.model';


const authSelector: MemoizedSelector<State, AuthState> = createFeatureSelector(NGRX_STATE_FEATURE_AUTH);


export const getAuthSelector: MemoizedSelector<State, AuthUserModel> = createSelector(
  authSelector,
  (state: AuthState) => state.authUser
);





