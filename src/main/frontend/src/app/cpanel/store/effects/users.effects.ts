import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as UsersActions from '../../../cpanel/store/actions/users.actions';
import { map, switchMap } from 'rxjs/operators';
import { CpanelService } from '../../service/cpanel.service';
import { User } from '../../../auth/model/User';


@Injectable()
export class UsersEffects {

  /**
   * Use catchError inside SwitchMap to keep flow working
   */

  public getUsers$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UsersTypes.requestGetUsers),
    switchMap(() => this.cpanelService.findAllUsers()),
    map((users: User[]) => {
      return UsersActions.GetUsersAction({users: users})
    })
  ));


  constructor(private readonly actions$: Actions, private readonly cpanelService: CpanelService) {
  }

}
