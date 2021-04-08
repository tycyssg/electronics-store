import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAuthSelector } from '../../../auth/store/selectors/auth.selectors';
import { AuthState } from '../../../auth/store/state/auth-state';
import { User } from '../../../auth/model/User';
import { DEFAULT_CONFIRM_MESSAGE, OPTION_ROLES } from '../../../app-constants';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Address } from '../../../auth/model/Address';
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { RequestChangeBillingAction, RequestDeleteAddressAction } from '../../../auth/store/actions/address.actions';
import { EditPaymentComponent } from '../edit-payment/edit-payment.component';
import { RequestChangePaymentAction, RequestDeletePaymentAction } from '../../../auth/store/actions/payment.actions';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { Product } from '../../../cpanel/model/product.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public productsAsMap: Map<number, Product> = new Map<number, Product>();
  public currentUser: User = undefined;
  public roles: any = OPTION_ROLES;
  private subs: Array<Subscription> = [];

  constructor(
    private readonly store: Store<AuthState>,
    private readonly dialog: MatDialog,
    public readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this._loadCurrentUser();
    this._loadProducts();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public onEditUserDetails() {
    this.dialog.open(EditUserComponent, {width: '650px', disableClose: true, data: {user: this.currentUser}});
  }

  private _loadProducts() {
    this.subs.push(this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.productsAsMap = new Map<number, Product>();
      payload.categories.forEach(c => {
        c.products.forEach(p => this.productsAsMap.set(p.productId, p));
      });
    }));
  }

  private _loadCurrentUser() {
    this.subs.push(this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      this.currentUser = payload.authUser;
    }));
  }

  public onAddAddress() {
    this.dialog.open(EditAddressComponent, {
      width: '650px',
      disableClose: true,
      data: {userId: this.currentUser.userId}
    });
  }

  public onEditAddress(address: Address) {
    this.dialog.open(EditAddressComponent, {
      width: '650px',
      disableClose: true,
      data: {address: address, userId: this.currentUser.userId}
    });
  }


  public onDeleteAddress(addressId: number | undefined) {
    if (!confirm(DEFAULT_CONFIRM_MESSAGE) || addressId == null) return;

    this.store.dispatch(RequestDeleteAddressAction({id: addressId!}));
  }

  public onSetDefaultAddress(addressId: number) {
    this.store.dispatch(RequestChangeBillingAction({id: addressId, secondId: this.currentUser.userId}))
  }


  public onAddPayment() {
    this.dialog.open(EditPaymentComponent, {
      width: '650px',
      disableClose: true,
      data: {userId: this.currentUser.userId}
    });
  }

  public onMakePaymentDefault(paymentId: number) {
    this.store.dispatch(RequestChangePaymentAction({id: paymentId, secondId: this.currentUser.userId}))
  }

  onDeletePayment(paymentId: number | undefined) {
    if (!confirm(DEFAULT_CONFIRM_MESSAGE) || paymentId == null) return;

    this.store.dispatch(RequestDeletePaymentAction({id: paymentId}));
  }
}


