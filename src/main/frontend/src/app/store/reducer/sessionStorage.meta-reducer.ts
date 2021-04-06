import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';

import { APP_NAME } from '../../app-constants';
import { State } from '../model/root.state';
import * as AuthActions from '../../auth/store/actions/auth.actions';
import { routerReducer } from '@ngrx/router-store';

const SESSION_STORAGE_STATE_KEY = `${APP_NAME}.state`;

function getSessionState(): State {
  return JSON.parse(<string>localStorage.getItem(SESSION_STORAGE_STATE_KEY));
}

function setSessionState(state: State): void {
  localStorage.setItem(SESSION_STORAGE_STATE_KEY, JSON.stringify(state));
}

export function sessionStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {

  let onInit = true;

  return (state: State, action: Action) => {

    const nextState = reducer(state, action);

    if (action.type === AuthActions.ApiActionTypes.logOutComplete) {
      state = {} as State;
      localStorage.removeItem(SESSION_STORAGE_STATE_KEY);
      return reducer(state, action);
    }

    if (onInit) {
      onInit = !onInit;
      const sessionState: State = getSessionState();
      return {...nextState, ...sessionState};
    }

    setSessionState(nextState);
    return nextState;
  };

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

