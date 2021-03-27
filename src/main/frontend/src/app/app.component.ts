import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from './auth/store/state/auth-state';
import { getAuthSelector } from './auth/store/selectors/auth.selectors';
import { SetLogoutTimerAction } from './auth/store/actions/auth.actions';
import { RequestGetCategoriesAction } from './cpanel/store/actions/categories.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'unitch';

  constructor(private readonly store: Store<AuthState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      this.store.dispatch(SetLogoutTimerAction({authUser: payload.authUser}))
    })
    this.store.dispatch(RequestGetCategoriesAction());
  }
}
