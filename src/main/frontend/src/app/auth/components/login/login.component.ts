import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/User';
import { select, Store } from '@ngrx/store';
import { LoginUserAction } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/state/auth-state';
import { getAuthSelector } from '../../store/selectors/auth.selectors';
import { ROUTE_PATH_LOGIN_REDIRECT } from '../../../app-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public currentYear = new Date().getFullYear();

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private readonly store: Store<AuthState>, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      if (payload.authUser) {
        this.router.navigate([ROUTE_PATH_LOGIN_REDIRECT]);
      }
    })
  }

  public login() {
    const user: User = this.loginForm.value
    this.store.dispatch(LoginUserAction({authUser: user}))
  }
}
