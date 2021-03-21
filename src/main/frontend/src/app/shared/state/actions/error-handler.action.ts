import { createAction, props } from '@ngrx/store';
import { ErrorHandler } from '../models/error-handler.model';


export const actionIdentifier = '[App Error Handler] active';

export const ErrorHandlerAction = createAction(actionIdentifier, props<ErrorHandler>());
