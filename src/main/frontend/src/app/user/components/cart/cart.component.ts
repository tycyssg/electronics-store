import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../cpanel/model/product.model';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { State } from '../../../store/model/root.state';
import { getAuthSelector } from '../../../auth/store/selectors/auth.selectors';
import { User } from '../../../auth/model/User';
import { CpanelService } from '../../../cpanel/service/cpanel.service';
import {
  RequestDeleteCartItemAction,
  RequestUpdateCartItemQuantityMinusAction,
  RequestUpdateCartItemQuantityPlusAction
} from '../../../auth/store/actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public currentUser: User | undefined = undefined;
  public productsAsMap: Map<number, Product> = new Map<number, Product>();
  public cartTotal: number = 0;
  private subs: Array<Subscription> = [];

  constructor(private readonly store: Store<State>, public cpanelService: CpanelService) {
  }

  ngOnInit(): void {
    this._loadProducts();
    this._loadUser();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public deleteItemFromCart(cartItemId: number) {
    this.store.dispatch(RequestDeleteCartItemAction({id: cartItemId}))
  }

  public decreaseQuantity(cartItemId: number) {
    this.store.dispatch(RequestUpdateCartItemQuantityMinusAction({id: cartItemId}))
  }

  public increaseQuantity(cartItemId: number) {
    this.store.dispatch(RequestUpdateCartItemQuantityPlusAction({id: cartItemId}))
  }

  private _loadUser() {
    this.subs.push(this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      this.currentUser = payload.authUser;
      this._calculateTotal();
    }));
  }

  private _loadProducts() {
    this.subs.push(this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.productsAsMap = new Map<number, Product>();
      payload.categories.forEach(c => {
        c.products.forEach(p => this.productsAsMap.set(p.productId, p));
      });
    }));
  }

  private _calculateTotal() {
    this.cartTotal = 0;
    this.currentUser.cartItems.forEach(c => {
      const isDiscounted = this.cpanelService.discountExpired(this.productsAsMap.get(c.productId).expireDiscount);

      if (isDiscounted) {
        this.cartTotal += ((this.productsAsMap.get(c.productId).price - (this.productsAsMap.get(c.productId).price * this.productsAsMap.get(c.productId).discountAmount) / 100) * c.productQuantity);
      } else {
        this.cartTotal += (this.productsAsMap.get(c.productId).price * c.productQuantity)
      }
    })
  }
}
