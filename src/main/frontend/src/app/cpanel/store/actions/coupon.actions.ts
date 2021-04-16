import { createAction, props } from '@ngrx/store';
import { IdModel } from '../../../store/model/id.model';
import { CouponModel } from '../../model/coupon.model';
import { CouponState } from '../models/coupon-state';

export const actionIdentifier = '[App User Coupon] active';

export const CouponTypes = {
  requestAddCoupon: `${actionIdentifier} Request add Coupon`,
  addCoupon: `${actionIdentifier} add Coupon`,
  requestGetCoupons: `${actionIdentifier} Request get Coupons`,
  getCoupons: `${actionIdentifier} get Coupons`,
  requestDeleteCoupon: `${actionIdentifier} Request Delete Coupon`,
  deleteCoupon: `${actionIdentifier} delete Coupon`,
};

export const RequestAddCouponAction = createAction(CouponTypes.requestAddCoupon, props<CouponModel>());
export const AddCouponAction = createAction(CouponTypes.addCoupon, props<CouponModel>());

export const RequestGetCouponsAction = createAction(CouponTypes.requestGetCoupons);
export const GetCouponsAction = createAction(CouponTypes.getCoupons, props<CouponState>());

export const RequestDeleteCouponAction = createAction(CouponTypes.requestDeleteCoupon, props<IdModel>());
export const DeleteCouponAction = createAction(CouponTypes.deleteCoupon, props<IdModel>());

