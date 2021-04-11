import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/User';
import { select, Store } from '@ngrx/store';
import { LoginUserAction, RegisterAction } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/state/auth-state';
import { getAuthSelector } from '../../store/selectors/auth.selectors';
import { ROUTE_PATH_LOGIN_REDIRECT } from '../../../app-constants';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showRegister: boolean = false;
  private subs: Subscription = undefined;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', [Validators.required, this.passwordNotMatch.bind(this)]),
  });

  constructor(private readonly store: Store<AuthState>, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.subs = this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      if (payload.authUser) {
        this.router.navigate([ROUTE_PATH_LOGIN_REDIRECT]);
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public login() {
    const user: User = this.loginForm.value
    this.store.dispatch(LoginUserAction({authUser: user}))
  }

  public switchToRegister() {
    this.showRegister = !this.showRegister;
  }

  public register() {
    this.store.dispatch(RegisterAction(this.registerForm.value))
    this.registerForm.reset();
    this.switchToRegister();
  }

  public passwordNotMatch(control: FormControl): { [s: string]: boolean } {
    const formValue = (control.value as string);
    if (this.registerForm?.get('password').value !== formValue) {
      return {passwordNotMatch: true};
    }
    return null;
  }
}
