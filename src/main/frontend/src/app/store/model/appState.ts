import * as Root from './root.state';
import { IsLoading } from '../../shared/state/models/isLoading.model';
import { ErrorHandler } from '../../shared/state/models/error-handler.model';

export interface AppState extends Root.State {
  loader: IsLoading;
  errorHandler: ErrorHandler;
}
