import { createAction, props } from '@ngrx/store';
import { UsersState } from '../models/users-state';

export const actionIdentifier = '[App Users] active';

export const UsersTypes = {
  requestGetUsers: `${actionIdentifier} Request get users`,
  getUsers: `${actionIdentifier} get users`
};

export const RequestGetUsersAction = createAction(UsersTypes.requestGetUsers);
export const GetUsersAction = createAction(UsersTypes.getUsers, props<UsersState>());


