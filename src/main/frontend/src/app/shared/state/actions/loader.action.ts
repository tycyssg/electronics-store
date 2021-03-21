import { createAction, props } from '@ngrx/store';
import { IsLoading } from '../models/isLoading.model';


export const actionIdentifier = '[App Loader] active';

export const LoaderAction = createAction(actionIdentifier, props<IsLoading>());
