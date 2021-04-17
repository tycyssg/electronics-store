import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { User } from '../../../auth/model/User';
import { Subscription } from 'rxjs';
import { Product } from '../../../cpanel/model/product.model';
import { getAuthSelector } from '../../../auth/store/selectors/auth.selectors';
import { getCategoriesSelector, getCouponsSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { CpanelService } from '../../../cpanel/service/cpanel.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from '../../../auth/model/Address';
import { PaymentDetails } from '../../../auth/model/PaymentDetails';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CheckoutSelectAddressComponent } from '../checkout-select-address/checkout-select-address.component';
import { CheckoutSelectPaymentComponent } from '../checkout-select-payment/checkout-select-payment.component';
import { ProductOrder } from '../../../auth/model/ProductOrder';
import { RequestMakePaymentAction } from '../../../auth/store/actions/cart.actions';
import { Router } from '@angular/router';
import { CouponModel } from '../../../cpanel/model/coupon.model';
import { NotifierService } from 'angular-notifier';
import { COUPON_INVALID, NOTIFICATION_TYPES } from '../../../app-constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public currentUser: User | undefined = undefined;
  public productsAsMap: Map<number, Product> = new Map<number, Product>();
  public cartTotal: number = 0;
  public dialogRef: MatDialogRef<CheckoutSelectAddressComponent>;
  public dialogRefPayment: MatDialogRef<CheckoutSelectPaymentComponent>;
  public couponControl: FormControl = new FormControl();
  public orderForm: FormGroup = new FormGroup({
    products: new FormControl([]),
    address: new FormControl(null),
    payment: new FormControl(null),
    orderTotal: new FormControl(null),
    coupon: new FormControl(null),
    userId: new FormControl(null),
  });
  private couponsList: CouponModel[] = [];
  private subs: Array<Subscription> = [];

  constructor(private readonly store: Store<State>, public cpanelService: CpanelService, private readonly dialog: MatDialog, private readonly router: Router, private readonly notifier: NotifierService) {
  }

  private static _selectMainAddress(addresses: Address[]): any {
    return addresses.find(a => a.billingAddress == true);
  }

  private static _selectMainPayment(payments: PaymentDetails[]): any {
    return payments.find(a => a.defaultPaymentMethod == true);
  }

  ngOnInit(): void {
    this._loadProducts();
    this._loadUser();
    this._loadCoupons();
    this.cartTotal = this.cpanelService.calculateTotal(this.currentUser.cartItems, this.productsAsMap);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public onChangeAddress() {
    this.dialogRef = this.dialog.open(CheckoutSelectAddressComponent, {
      width: '650px',
      disableClose: true,
      data: {addresses: this.currentUser.addresses}
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) return;

      this.orderForm.get('address').setValue(response);
    })
  }

  public onChangePayment() {
    this.dialogRefPayment = this.dialog.open(CheckoutSelectPaymentComponent, {
      width: '450px',
      disableClose: true,
      data: {payments: this.currentUser.paymentDetails}
    });

    this.dialogRefPayment.afterClosed().subscribe(response => {
      if (!response) return;

      this.orderForm.get('payment').setValue(response);
    })
  }

  public onPay() {
    const products: ProductOrder[] = this.currentUser.cartItems.map(c => ({
      productId: c.productId,
      quantity: c.productQuantity
    }));
    this.orderForm.get('products').setValue(products);
    this.orderForm.get('orderTotal').setValue(this.cartTotal);
    this.orderForm.get('userId').setValue(this.currentUser.userId);

    this.store.dispatch(RequestMakePaymentAction(this.orderForm.value));
  }

  private _loadUser() {
    this.subs.push(this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      this.currentUser = payload.authUser;
      this._populateOrderForm();
      if (this.currentUser.cartItems.length == 0) {
        this.router.navigate(['/landing', 'products'])
      }
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

  public onApplyCoupon() {
    const coupon = this.couponsList.find(c => c.couponCode === this.couponControl.value.trim());
    if (!coupon) {
      this.notifier.notify(NOTIFICATION_TYPES.error, COUPON_INVALID);
    } else if (!this.cpanelService.discountExpired(coupon.validTime)) {
      this.notifier.notify(NOTIFICATION_TYPES.error, COUPON_INVALID);
    } else {
      this.orderForm.get('coupon').setValue(coupon);
      this.cartTotal = (this.cartTotal - (this.cartTotal * coupon.discountPercentage) / 100)
    }

    this.couponControl.reset();
  }

  private _populateOrderForm() {
    this.orderForm.get('address').setValue(CheckoutComponent._selectMainAddress(this.currentUser.addresses));
    this.orderForm.get('payment').setValue(CheckoutComponent._selectMainPayment(this.currentUser.paymentDetails));
  }

  private _loadCoupons() {
    this.subs.push(this.store.pipe(select(getCouponsSelector)).subscribe(payload => {
      this.couponsList = payload.coupons;
    }));
  }
}
