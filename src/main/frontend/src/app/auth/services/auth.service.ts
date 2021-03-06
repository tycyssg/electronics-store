import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FORBIDDEN_ACCESS_ERROR_BLOCK,
  FORBIDDEN_ACCESS_ERROR_INACTIVE,
  HEADERS_FOR_POST,
  UNAUTHORIZED_ACCESS_ERROR
} from '../../app-constants';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { User } from '../model/User';
import { AuthState } from '../store/state/auth-state';
import { LogOutUserAction } from '../store/actions/auth.actions';
import { ErrorHandlerAction } from '../../shared/state/actions/error-handler.action';
import { getAuthSelector } from '../store/selectors/auth.selectors';
import { map, take } from 'rxjs/operators';
import { Authorities } from '../model/Authorities';

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly urls = {
    login: '/api/login',
    register: '/api/register',
    updateUser: '/api/updateUser'
  };

  private tokenExpirationTimer: any;

  constructor(private readonly httpClient: HttpClient, private readonly store: Store<AuthState>) {
  }

  public login(user: User): Observable<User> {
    return this.httpClient.post<User>(this.urls.login, user, {headers: HEADERS_FOR_POST});
  }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.urls.register, user, {headers: HEADERS_FOR_POST});
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.urls.updateUser, user, {headers: HEADERS_FOR_POST});
  }

  public isAdmin(): Observable<boolean> {
    return this.store.pipe(select(getAuthSelector)).pipe(take(1), map(authU => !!authU.authUser.authorities.find(a => a.authority === Authorities.USER_A)))
  }

  public setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(LogOutUserAction());
    }, expirationDuration)
  }


  public clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  public dispatch403Action() {
    this.store.dispatch(ErrorHandlerAction({
      showError: false,
      errorMessage: UNAUTHORIZED_ACCESS_ERROR,
      strongTitle: '403',
      allowToClose: false
    }));
  }

  public dispatchActionForInactive() {
    this.store.dispatch(ErrorHandlerAction({
      showError: false,
      errorMessage: FORBIDDEN_ACCESS_ERROR_INACTIVE,
      strongTitle: '401',
      allowToClose: false
    }));
  }

  public dispatchActionForBlock() {
    this.store.dispatch(ErrorHandlerAction({
      showError: false,
      errorMessage: FORBIDDEN_ACCESS_ERROR_BLOCK,
      strongTitle: '401',
      allowToClose: false
    }));
  }

}
