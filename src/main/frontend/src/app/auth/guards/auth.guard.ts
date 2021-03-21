import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../store/state/auth-state';
import { ROUTE_PATH_ERROR, ROUTE_PATH_LOGIN } from '../../app-constants';
import { AuthService } from '../services/auth.service';
import { getAuthSelector } from '../store/selectors/auth.selectors';
import { map, take } from 'rxjs/operators';
import { User } from '../model/User';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly  router: Router,
    private readonly store: Store<AuthState>,
    private readonly authService: AuthService
  ) {
  }

  private static _verifyTheRoles(route: ActivatedRouteSnapshot, user: User): boolean {
    let found = false;

    for (let i = 0; i < route.data.authorities.length; i++) {
      found = !!user.authorities.find(auth => auth.authority === route.data.authorities[i]);
      if (found)
        return found;
    }
    return found;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {

    return this.store.pipe(select(getAuthSelector)).pipe(
      take(1),
      map(state => state.authUser),
      map(user => {

        const isAuth = !!user;
        if (isAuth) {
          if (!user.isActive) {
            this.authService.dispatchActionForInactive();
            return this.router.createUrlTree([ROUTE_PATH_ERROR]);
          }

          if (user.isLocked) {
            this.authService.dispatchActionForBlock();
            return this.router.createUrlTree([ROUTE_PATH_ERROR]);
          }

          if (route.data.authorities && !AuthGuard._verifyTheRoles(route, user)) {
            this.authService.dispatch403Action();
            return this.router.createUrlTree([ROUTE_PATH_ERROR]);
          }

          return true;
        }
        return this.router.createUrlTree([ROUTE_PATH_LOGIN]);
      })
    );

  }


}

