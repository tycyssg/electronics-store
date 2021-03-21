import { createAction, props } from '@ngrx/store';
import { AuthUserModel } from '../models/authUser.model';

export const actionIdentifier = '[App Authentication] active';

export const ApiActionTypes = {
  getLoginUser: `${actionIdentifier} Get Login User`,
  loginUser: `${actionIdentifier} Login The User`,
  logOutTimer: `${actionIdentifier} Logout Timer`,
  logOutUser: `${actionIdentifier} Logout User`,
  logOutComplete: `${actionIdentifier} Logout User complete`
};

export const GetLoginUserAction = createAction(ApiActionTypes.getLoginUser, props<AuthUserModel>());
export const LoginUserAction = createAction(ApiActionTypes.loginUser, props<AuthUserModel>());
export const SetLogoutTimerAction = createAction(ApiActionTypes.logOutTimer, props<AuthUserModel>());
export const LogOutUserAction = createAction(ApiActionTypes.logOutUser);
export const LogOutCompleteAction = createAction(ApiActionTypes.logOutComplete);
