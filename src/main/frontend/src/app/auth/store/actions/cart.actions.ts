import { createAction, props } from '@ngrx/store';
import { IdModel } from '../../../store/model/id.model';
import { CartItems } from '../../model/CartItems';

export const actionIdentifier = '[App User Cart] active';

export const CartItemTypes = {
  requestAddCartItem: `${actionIdentifier} Request add CartItem`,
  addCartItem: `${actionIdentifier} add CartItem`,
  requestUpdateCartItemQuantityPlus: `${actionIdentifier} Request update CartItem Plus`,
  updateCartItemQuantityPlus: `${actionIdentifier} update CartItem Plus`,
  requestUpdateCartItemQuantityMinus: `${actionIdentifier} Request update CartItem Minus`,
  updateCartItemQuantityMinus: `${actionIdentifier} update CartItem Minus`,
  requestDeleteCartItem: `${actionIdentifier} Request Delete CartItem`,
  deleteCartItem: `${actionIdentifier} Delete CartItem`,
};

export const RequestAddCartItemAction = createAction(CartItemTypes.requestAddCartItem, props<CartItems>());
export const AddCartItemAction = createAction(CartItemTypes.addCartItem, props<CartItems>());

export const RequestUpdateCartItemQuantityPlusAction = createAction(CartItemTypes.requestUpdateCartItemQuantityPlus, props<IdModel>());
export const UpdateCartItemQuantityPlusAction = createAction(CartItemTypes.updateCartItemQuantityPlus, props<IdModel>());

export const RequestUpdateCartItemQuantityMinusAction = createAction(CartItemTypes.requestUpdateCartItemQuantityMinus, props<IdModel>());
export const UpdateCartItemQuantityMinusAction = createAction(CartItemTypes.updateCartItemQuantityMinus, props<IdModel>());

export const RequestDeleteCartItemAction = createAction(CartItemTypes.requestDeleteCartItem, props<IdModel>());
export const DeleteCartItemAction = createAction(CartItemTypes.deleteCartItem, props<IdModel>());

