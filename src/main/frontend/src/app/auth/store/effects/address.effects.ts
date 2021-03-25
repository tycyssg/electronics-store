import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as AddressAction from '../../../auth/store/actions/address.actions';
import { map, switchMap } from 'rxjs/operators';
import {
  ADDRESS_ADDED,
  ADDRESS_BILLED_CHANGED,
  ADDRESS_DELETED,
  ADDRESS_UPDATED,
  NOTIFICATION_TYPES,
} from '../../../app-constants';
import { AddressService } from '../../services/address.service';
import { Address } from '../../model/Address';

@Injectable()
export class AddressEffects {

  /**
   * Use catchError inside SwitchMap to keep flow working
   */

  public addAddress$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AddressAction.AddressTypes.requestAddAddress),
    switchMap((address: any) => this.addressService.addAddress(address)),
    map((address: Address) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, ADDRESS_ADDED);
      return AddressAction.AddAddressAction(address)
    })
  ));

  public updateAddress$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AddressAction.AddressTypes.requestUpdateAddress),
    switchMap((address: any) => this.addressService.updateAddress(address)),
    map((address: Address) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, ADDRESS_UPDATED);
      return AddressAction.UpdateAddressAction(address)
    })
  ));

  public deleteAddress$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AddressAction.AddressTypes.requestDeleteAddress),
    switchMap((payload: any) => this.addressService.deleteAddress(payload.id)),
    map((id: number) => {
      this.notifier.notify(NOTIFICATION_TYPES.error, ADDRESS_DELETED);
      return AddressAction.DeleteAddressAction({id: id})
    })
  ));

  public billingAddress$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AddressAction.AddressTypes.requestChangeBillingAddress),
    switchMap((payload: any) => this.addressService.makeBillingAddress(payload.id, payload.secondId)),
    map((id: number) => {
      this.notifier.notify(NOTIFICATION_TYPES.info, ADDRESS_BILLED_CHANGED);
      return AddressAction.ChangeBillingAddressAction({id: id})
    })
  ));


  constructor(private readonly actions$: Actions, private readonly addressService: AddressService, private readonly notifier: NotifierService) {
  }

}
