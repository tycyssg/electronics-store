import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { AppState } from '../../../store/model/appState';
import { ErrorHandlerAction } from '../../state/actions/error-handler.action';
import { LogOutCompleteAction } from '../../../auth/store/actions/auth.actions';
import {
  DEFAULT_ERROR_MESSAGE,
  NO_SERVER_ACCESS_ERROR,
  ROUTE_PATH_ERROR,
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_NOT_FOUND
} from '../../../app-constants';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {


  constructor(private readonly store: Store<AppState>, private router: Router) {
  }

  public gateAwayTimeoutError() {
    this.store.dispatch(ErrorHandlerAction({
      showError: false,
      errorMessage: NO_SERVER_ACCESS_ERROR,
      strongTitle: '504',
      allowToClose: false
    }));
  }

  public endpointNotFound() {
    this.router.navigate([ROUTE_PATH_NOT_FOUND]);
  }

  public handleError(errorRes: HttpErrorResponse): void {
    const error = {
      errorMessage: DEFAULT_ERROR_MESSAGE,
      strongTitle: '500'
    };

    if (!errorRes.error) {
      this.errorWithRedirect(error);
    } else {
      switch (errorRes.error.httpStatusCode) {
        case 500:
        case 409:
        case 410:
          this.notificationError(errorRes.error);
          break;
        case 401:
          this.error401(errorRes.error);
          break;
        case 403:
        default:
          this.errorWithRedirect(errorRes.error);
      }
    }
  }

  public error403(error: any): void {
    const errorMessage = error.message;
    const strongTitle = error.httpStatusCode;

    this.store.dispatch(ErrorHandlerAction({showError: true, strongTitle, errorMessage, allowToClose: true}));
  }

  public error401(error: any): void {
    const errorMessage = error.message;
    const strongTitle = error.httpStatusCode;

    this.store.dispatch(LogOutCompleteAction());
    this.store.dispatch(ErrorHandlerAction({showError: true, strongTitle, errorMessage, allowToClose: true}));
    this.router.navigate([ROUTE_PATH_LOGIN]);
  }

  public errorWithRedirect(error: any): void {
    const errorMessage = error.message;
    const strongTitle = error.httpStatusCode;

    this.store.dispatch(ErrorHandlerAction({showError: false, strongTitle, errorMessage}));
    this.router.navigate([ROUTE_PATH_ERROR]);
  }

  public notificationError(error: any): void {
    const errorMessage = error.message;
    const strongTitle = error.httpStatusCode;

    this.store.dispatch(ErrorHandlerAction({showError: true, strongTitle, errorMessage, allowToClose: true}));
  }
}

