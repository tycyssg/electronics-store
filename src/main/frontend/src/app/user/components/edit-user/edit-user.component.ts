import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../auth/model/User';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { filter, take, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestUpdateUserDetailsAction } from '../../../auth/store/actions/auth.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public updateUserForm: FormGroup = new FormGroup({
    userId: new FormControl(null),
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNo: new FormControl(null, Validators.required),
  });

  constructor(
    private readonly store: Store<State>,
    private readonly router: Router,
    public readonly dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
  }

  ngOnInit(): void {
    this._closeDialogOnNavigate();
    this.updateUserForm.patchValue(this.data.user)
  }

  public onDialogClose() {
    this.dialogRef.close();
  }

  public onEditUserDetails() {
    console.log('dd')
    if (!this.updateUserForm.valid) return;

    this.store.dispatch(RequestUpdateUserDetailsAction(this.updateUserForm.value))
    this.onDialogClose();
  }

  private _closeDialogOnNavigate() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationStart),
      tap(() => this.onDialogClose()),
      take(1),
    ).subscribe();
  }
}
