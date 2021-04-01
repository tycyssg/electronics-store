import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from './auth/store/state/auth-state';
import { getAuthSelector } from './auth/store/selectors/auth.selectors';
import { SetLogoutTimerAction } from './auth/store/actions/auth.actions';
import { RequestGetCategoriesAction } from './cpanel/store/actions/categories.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'unitch';
  private subs: Subscription = undefined;

  constructor(private readonly store: Store<AuthState>) {
  }

  ngOnInit(): void {
    this.subs = this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      this.store.dispatch(SetLogoutTimerAction({authUser: payload.authUser}))
    })
    this.store.dispatch(RequestGetCategoriesAction());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
