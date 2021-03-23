import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { AuthUserModel } from '../models/authUser.model';


export const initialState: AuthUserModel = {authUser: null as any};


const loginReducer: ActionReducer<AuthUserModel, Action> = createReducer(
  initialState,
  on(AuthActions.GetLoginUserAction, (state: AuthUserModel, action: any) => ({...state, authUser: action.authUser})),
  on(AuthActions.UpdateUserDetailsAction, (state: AuthUserModel, action: any) =>
    ({
      ...state,
      authUser: {
        ...state.authUser,
        username: action.authUser.username,
        email: action.authUser.email,
        phoneNo: action.authUser.phoneNo
      }
    })),
);


const logoutReducer: ActionReducer<AuthUserModel, Action> = createReducer(
  initialState,
  on(AuthActions.LogOutUserAction, (state: AuthUserModel, action: any) => ({...state, authUser: null as any}))
);


export function getAuthenticatedUserReducer(state: AuthUserModel, action: Action): AuthUserModel {
  return loginReducer(state, action);
}

export function logOutReducer(state: AuthUserModel, action: Action): AuthUserModel {
  return logoutReducer(state, action);
}
