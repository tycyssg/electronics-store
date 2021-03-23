import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  NOTIFICATION_TYPES,
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_LOGIN_REDIRECT,
  USER_LOGGED_OUT,
  USER_REGISTERED,
  USER_UPDATED
} from '../../../app-constants';
import { NotifierService } from 'angular-notifier';
import { User } from '../../model/User';
import { State } from '../../../store/model/root.state';

@Injectable()
export class AuthEffects {

  public getAuthenticationStatus$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ApiActionTypes.loginUser),
    switchMap((authData: any) => this.authService.login(authData.authUser)),
    mergeMap((user: User) => {
      user.tokenExpirationDate = new Date(new Date().getTime() + user.expiresIn);
      this.notifier.notify(NOTIFICATION_TYPES.success, 'Welcome back ' + user.username)
      return [AuthActions.GetLoginUserAction({authUser: user}), AuthActions.SetLogoutTimerAction({authUser: user})]
    })
  ));

  public updateNode$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ApiActionTypes.requestUpdateUserDetails),
    switchMap((user: any) => this.authService.updateUser(user)),
    map((user: User) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, USER_UPDATED);
      return AuthActions.UpdateUserDetailsAction({authUser: user})
    })
  ));

  private setLogoutTimer$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ApiActionTypes.logOutTimer),
    tap((payload: any) => {
      const user: User = payload.authUser;
      if (!user) {
        return;
      }

      const expDate = new Date(user.tokenExpirationDate);
      this.authService.setLogoutTimer(expDate.getTime() - new Date().getTime());
      return;
    })
  ), {dispatch: false})

  private authenticationRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ApiActionTypes.getLoginUser),
    tap(() => {
      this.router.navigate([ROUTE_PATH_LOGIN_REDIRECT]);
    })
  ), {dispatch: false})

  private logOutRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ApiActionTypes.logOutUser),
    map(() => {
      this.authService.clearLogoutTimer();
      this.notifier.notify(NOTIFICATION_TYPES.success, USER_LOGGED_OUT);
      this.router.navigate([ROUTE_PATH_LOGIN]);
      return AuthActions.LogOutCompleteAction();
    })
  ));

  private register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ApiActionTypes.registerUser),
    switchMap((payload: any) => this.authService.register(payload)),
    tap(() => this.notifier.notify(NOTIFICATION_TYPES.success, USER_REGISTERED))
  ), {dispatch: false})

  constructor(private readonly actions$: Actions, private readonly authService: AuthService, private readonly router: Router, private readonly notifier: NotifierService, private readonly store: Store<State>) {
  }


}
