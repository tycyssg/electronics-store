import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../store/state/auth-state';
import { getAuthSelector } from '../store/selectors/auth.selectors';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.pipe(
      select(getAuthSelector),
      take(1),
      map(authState => authState.authUser),
      exhaustMap(user => {

        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
