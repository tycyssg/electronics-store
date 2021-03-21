import { RouterReducerState } from '@ngrx/router-store';
import { AppState } from './appState';

export interface State {
  app?: AppState;
  router?: RouterReducerState<any>;
}
