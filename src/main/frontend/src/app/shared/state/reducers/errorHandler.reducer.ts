import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ErrorHandler } from '../models/error-handler.model';
import { ErrorHandlerAction } from '../actions/error-handler.action';

export const initialState: ErrorHandler = {showError: false, errorMessage: ''};

const reducer: ActionReducer<ErrorHandler, Action> = createReducer(
  initialState,
  on(ErrorHandlerAction, (state: ErrorHandler, action: any) => ({
    ...state,
    showError: action.showError,
    errorMessage: action.errorMessage,
    allowToClose: action.allowToClose,
    strongTitle: action.strongTitle
  }))
);

export function errorHandlerReducer(state: ErrorHandler, action: Action): any {
  return reducer(state, action);
}
