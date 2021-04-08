import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as UserActions from '../../../cpanel/store/actions/users.actions';
import { UsersState } from '../models/users-state';

export const initialState: UsersState = {users: []};

const uReducer: ActionReducer<UsersState, Action> = createReducer(
  initialState,
  on(UserActions.GetUsersAction, (state: UsersState, action: any) => ({
    ...state,
    users: [...action.users]
  })),
);


export function usersReducer(state: UsersState, action: Action): any {
  return uReducer(state, action);
}
