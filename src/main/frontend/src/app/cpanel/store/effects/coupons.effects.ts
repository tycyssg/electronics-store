import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as CouponActions from '../../../cpanel/store/actions/coupon.actions';
import { map, switchMap } from 'rxjs/operators';
import { COUPON_ADDED, COUPON_DELETED, NOTIFICATION_TYPES, } from '../../../app-constants';
import { CpanelService } from '../../service/cpanel.service';
import { CouponModel } from '../../model/coupon.model';


@Injectable()
export class CouponsEffects {

  /**
   * Use catchError inside SwitchMap to keep flow working
   */

  public addCoupon$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CouponActions.CouponTypes.requestAddCoupon),
    switchMap((coupon: any) => this.cpanelService.addCoupon(coupon)),
    map((coupon: CouponModel) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, COUPON_ADDED);
      return CouponActions.AddCouponAction(coupon)
    })
  ));

  public getCoupons$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CouponActions.CouponTypes.requestGetCoupons),
    switchMap(() => this.cpanelService.getCoupons()),
    map((coupons: CouponModel[]) => {
      return CouponActions.GetCouponsAction({coupons: coupons})
    })
  ));

  public deleteCoupon$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CouponActions.CouponTypes.requestDeleteCoupon),
    switchMap((payload: any) => this.cpanelService.deleteCoupon(payload.id)),
    map((id: number) => {
      this.notifier.notify(NOTIFICATION_TYPES.error, COUPON_DELETED);
      return CouponActions.DeleteCouponAction({id: id})
    })
  ));


  constructor(private readonly actions$: Actions, private readonly cpanelService: CpanelService, private readonly notifier: NotifierService) {
  }

}
