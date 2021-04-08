import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRouterModule } from './user-router.module';
import { ProfileComponent } from './components/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { EditPaymentComponent } from './components/edit-payment/edit-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutSelectAddressComponent } from './components/checkout-select-address/checkout-select-address.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckoutSelectPaymentComponent } from './components/checkout-select-payment/checkout-select-payment.component';
import { CheckoutCompleteComponent } from './components/checkout-complete/checkout-complete.component';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [ProfileComponent, EditUserComponent, EditAddressComponent, EditPaymentComponent, CartComponent, CheckoutComponent, CheckoutSelectAddressComponent, CheckoutSelectPaymentComponent, CheckoutCompleteComponent],
  imports: [
    CommonModule,
    UserRouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    SharedModule,
    MatExpansionModule
  ],
  providers: []
})
export class UserModule {
}
