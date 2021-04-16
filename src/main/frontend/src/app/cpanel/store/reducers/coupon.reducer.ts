import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as CouponActions from '../../../cpanel/store/actions/coupon.actions';
import { CouponState } from '../models/coupon-state';

export const initialState: CouponState = {coupons: []};

const coupReducer: ActionReducer<CouponState, Action> = createReducer(
  initialState,
  on(CouponActions.AddCouponAction, (state: CouponState, action: any) => ({
    ...state,
    coupons: [...state.coupons, action]
  })),
  on(CouponActions.GetCouponsAction, (state: CouponState, action: any) => ({
    ...state,
    coupons: [...action.coupons]
  })),
  on(CouponActions.DeleteCouponAction, (state: CouponState, action: any) => ({
    ...state,
    coupons: state.coupons.filter(c => c.couponId !== action.id)
  })),
);


export function couponReducer(state: CouponState, action: Action): any {
  return coupReducer(state, action);
}
