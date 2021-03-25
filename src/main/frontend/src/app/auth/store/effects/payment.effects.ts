import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as PaymentAction from '../../../auth/store/actions/payment.actions';
import { map, switchMap } from 'rxjs/operators';
import { NOTIFICATION_TYPES, PAYMENT_ADDED, PAYMENT_DEFAULT_CHANGED, PAYMENT_DELETED, } from '../../../app-constants';
import { PaymentDetails } from '../../model/PaymentDetails';
import { PaymentService } from '../../services/payment.service';

@Injectable()
export class PaymentEffects {

  /**
   * Use catchError inside SwitchMap to keep flow working
   */

  public addPayment$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(PaymentAction.PaymentTypes.requestAddPayment),
    switchMap((payment: any) => this.paymentService.addPayment(payment)),
    map((payment: PaymentDetails) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, PAYMENT_ADDED);
      return PaymentAction.AddPaymentAction(payment)
    })
  ));

  public deletePayment$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(PaymentAction.PaymentTypes.requestDeletePayment),
    switchMap((payload: any) => this.paymentService.deletePayment(payload.id)),
    map((id: number) => {
      this.notifier.notify(NOTIFICATION_TYPES.error, PAYMENT_DELETED);
      return PaymentAction.DeletePaymentAction({id: id})
    })
  ));

  public defaultPayment$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(PaymentAction.PaymentTypes.requestDefaultPayment),
    switchMap((payload: any) => this.paymentService.makeDefaultPayment(payload.id, payload.secondId)),
    map((id: number) => {
      this.notifier.notify(NOTIFICATION_TYPES.info, PAYMENT_DEFAULT_CHANGED);
      return PaymentAction.ChangePaymentAction({id: id})
    })
  ));


  constructor(private readonly actions$: Actions, private readonly paymentService: PaymentService, private readonly notifier: NotifierService) {
  }

}
