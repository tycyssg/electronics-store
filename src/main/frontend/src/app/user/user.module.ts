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


@NgModule({
  declarations: [ProfileComponent, EditUserComponent, EditAddressComponent, EditPaymentComponent, CartComponent],
  imports: [
    CommonModule,
    UserRouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: []
})
export class UserModule {
}
