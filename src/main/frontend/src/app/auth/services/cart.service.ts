import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HEADERS_FOR_POST, } from '../../app-constants';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/state/auth-state';
import { CartItems } from '../model/CartItems';

@Injectable({providedIn: 'root'})
export class CartService {

  private readonly urls = {
    addCartItem: '/api/addCartItem',
    updateCartItemPlus: '/api/updateCartItemPlus',
    updateCartItemMinus: '/api/updateCartItemMinus',
    deleteCartItem: '/api/deleteCartItem',
  };

  constructor(private readonly httpClient: HttpClient, private readonly store: Store<AuthState>) {
  }

  public addCartItem(cartItem: CartItems): Observable<CartItems> {
    return this.httpClient.post<CartItems>(this.urls.addCartItem, cartItem, {headers: HEADERS_FOR_POST});
  }

  public updateCartItemPlus(cartItemId: string): Observable<number> {
    const url = `${this.urls.updateCartItemPlus}/${cartItemId}`;

    return this.httpClient.put<number>(url, null, {headers: HEADERS_FOR_POST});
  }

  public updateCartItemMinus(cartItemId: string): Observable<number> {
    const url = `${this.urls.updateCartItemMinus}/${cartItemId}`;

    return this.httpClient.put<number>(url, null, {headers: HEADERS_FOR_POST});
  }

  public deleteCartItem(cartItemId: string): Observable<number> {
    const url = `${this.urls.deleteCartItem}/${cartItemId}`;

    return this.httpClient.delete<number>(url);
  }

}
