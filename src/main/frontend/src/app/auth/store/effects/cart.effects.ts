import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as CartActions from '../../../auth/store/actions/cart.actions';
import { map, switchMap } from 'rxjs/operators';
import { ITEM_ADDED, NOTIFICATION_TYPES, } from '../../../app-constants';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../model/CartItems';

@Injectable()
export class CartEffects {

  /**
   * Use catchError inside SwitchMap to keep flow working
   */

  public addCartItem$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CartActions.CartItemTypes.requestAddCartItem),
    switchMap((cartItem: any) => this.cartService.addCartItem(cartItem)),
    map((cartItem: CartItems) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, ITEM_ADDED);
      return CartActions.AddCartItemAction(cartItem)
    })
  ));

  public updateQuantityPlus$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CartActions.CartItemTypes.requestUpdateCartItemQuantityPlus),
    switchMap((payload: any) => this.cartService.updateCartItemPlus(payload.id)),
    map((id: number) => {
      return CartActions.UpdateCartItemQuantityPlusAction({id: id})
    })
  ));

  public updateQuantityMinus$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CartActions.CartItemTypes.requestUpdateCartItemQuantityMinus),
    switchMap((payload: any) => this.cartService.updateCartItemMinus(payload.id)),
    map((id: number) => {
      return CartActions.UpdateCartItemQuantityMinusAction({id: id})
    })
  ));

  public deleteCartItem$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CartActions.CartItemTypes.requestDeleteCartItem),
    switchMap((payload: any) => this.cartService.deleteCartItem(payload.id)),
    map((id: number) => {
      return CartActions.DeleteCartItemAction({id: id})
    })
  ));


  constructor(private readonly actions$: Actions, private readonly cartService: CartService, private readonly notifier: NotifierService) {
  }

}
