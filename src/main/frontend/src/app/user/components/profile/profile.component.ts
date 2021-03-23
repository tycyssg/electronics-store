import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAuthSelector } from '../../../auth/store/selectors/auth.selectors';
import { AuthState } from '../../../auth/store/state/auth-state';
import { User } from '../../../auth/model/User';
import { OPTION_ROLES } from '../../../app-constants';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser: User = undefined;
  public roles: any = OPTION_ROLES;

  constructor(
    private readonly store: Store<AuthState>,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this._loadCurrentUser();
  }

  public onEditUserDetails() {
    this.dialog.open(EditUserComponent, {width: '650px', disableClose: true, data: {user: this.currentUser}});
  }

  private _loadCurrentUser() {
    this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      this.currentUser = payload.authUser;
    })
  }

}
