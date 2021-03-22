import { Component, OnInit } from '@angular/core';
import { LogOutUserAction } from '../../../auth/store/actions/auth.actions';
import { User } from '../../../auth/model/User';
import { select, Store } from '@ngrx/store';
import { getAuthSelector } from '../../../auth/store/selectors/auth.selectors';
import { State } from '../../../store/model/root.state';
import { LOGO_TEXT } from '../../../app-constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public user: User = null as any;
  public loggedUser: boolean = false;
  public logoText = LOGO_TEXT;

  constructor(private readonly store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      this.loggedUser = !!payload.authUser;
      this.user = payload.authUser;
    })
  }

  public logOut(): void {
    this.store.dispatch(LogOutUserAction());
  }
}
